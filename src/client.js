class Client {
    constructor(game, player) {
        this.game = game

        this.mainPlayer = player

        this.roomConn;
        this.mainConn;

        this.recentPing = 0

        let name = localStorage.getItem("username")
        name = name||"unnamed"
        this.username = name
        this.connectedPlayers = new Set()
    }
    init(roomId) {
        this.roomConn = new Connection2W()
        this.roomConn.connect(roomId)

        this.roomConn.e.onData = (d)=>{
            this.processData(d)
        }

        this.roomConn.e.onConnection = () => {
            // Show room code
            setRoomCode(roomId);
            // Add own username to member list
            addPlayerToMenu(this.username);
            this.connectedPlayers.add(this.mainPlayer.body.id);
        }

        this.roomConn.e.onConnectionFail = ()=>{
            console.log("retrying")
            this.init(roomId)
        }
    }

    processData(d,rd) {
        try {
            d = JSON.parse(d);
            
            if (true) {
                if (d.reconnectToThis) {
                    this.mainConn = new Connection2W();
                    this.mainConn.connect(d.reconnectToThis);
                    this.mainConn.e.onData = (d, rd)=>{
                        this.processData(d,rd);
                    };
                    this.mainConn.e.onConnection = ()=>{
                        // Send username to host when connected
                        this.mainConn.send(JSON.stringify({
                            setUsername: this.username
                        }));
                    };
                }
                if (d.playerUsername) {
                    // Add or update player username in member list
                    const playerId = d.playerUsername.id;
                    const username = d.playerUsername.username;
                    
                    // Skip if it's our own username
                    if (playerId === this.mainPlayer.body.id) {
                        return;
                    }
                    
                    // Add username to member list
                    addPlayerToMenu(username);
                }
                if (d.playerData) {
                    // Get current player IDs
                    const currentPlayerIds = new Set(d.playerData.map(p => p.id));
                    
                    // Check for disconnected players
                    for (const playerId of this.connectedPlayers) {
                        if (!currentPlayerIds.has(playerId)) {
                            this.connectedPlayers.delete(playerId);
                            // Find and remove the player from the member list
                            const memberList = document.getElementById("memberlist");
                            const members = memberList.getElementsByTagName("div");
                            for (let i = 0; i < members.length; i++) {
                                if (members[i].textContent.includes(playerId)) {
                                    memberList.removeChild(members[i]);
                                    break;
                                }
                            }
                        }
                    }
                    
                    this.updateHostPlayers(d.playerData);
                }
                if (d.syncData && mainGame.running) {
                    this.game.syncHandler.processSyncData(d.syncData);
                }
                if (d.setColor) {
                    this.mainPlayer.color = d.setColor;
                }
                if (d.startGame) {
                    startGame();
                }
                if (d.setLevel) {
                    if (typeof d.setLevel === 'string' && d.setLevel.trim() !== '') {
                        this.game.renderer.levelTransistion(d.setLevel);
                    } else {
                        console.warn('Invalid level name received:', d.setLevel);
                    }
                }
            }
        } catch (e) {
            console.error('Error processing client data:', e);
        }
    }
    updateKey(keycode, value) {
        if (this.mainConn != undefined && this.mainConn.fullyConnected) {
            this.mainConn.send(JSON.stringify({
                keycode: {
                    code: keycode,
                    value: value,
                },
                playerState: {
                    position: this.mainPlayer.body.position,
                    velocity: this.mainPlayer.body.velocity
                }
            }));
        }
    }
    updateHost() {
        if (this.mainConn !=undefined&&this.mainConn.fullyConnected) this.mainConn.send(JSON.stringify({
            player:parsePlayerData(this.mainPlayer)
        }))
    }
    updateHostPlayers(players) {
        var findPlayerById = (id) => {
            for (let i = 0; i < this.game.players.length; i++) {
                const player = this.game.players[i];
                if (player.body.id == id) return player;
            }
        }
        
        // Clear previous member list
        document.getElementById("memberlist").innerHTML = '';
        
        // First add ourselves to the member list
        addPlayerToMenu(this.username);
        
        for (let i = 0; i < players.length; i++) {
            const playerData = players[i];
            var playerId = playerData.id;

            // Skip ourselves since we already added our name
            if (playerId === this.mainPlayer.body.id) {
                continue;
            }

            // Add player to member list if not already added
            if (!this.connectedPlayers.has(playerId)) {
                this.connectedPlayers.add(playerId);
                // We'll need to get the username from the host
                this.mainConn.send(JSON.stringify({
                    requestUsername: playerId
                }));
            }

            var foundPlayer = findPlayerById(playerId);
            if (foundPlayer == undefined) {
                foundPlayer = mainGame.playerhandler.addPlayer({
                    bodyOptions: {
                        id: playerData.id,
                    },
                });
                foundPlayer.onlinePlayer = true;
            }

            if (foundPlayer.body.id !== this.mainPlayer.body.id) {
                this.setPlayer(foundPlayer, playerData, true);
            } else {
                this.setPlayer(foundPlayer, playerData, false);
            }
        }
    }
    setPlayer(body, data, updatePhysics=true) {
        if (body.body.id === this.mainPlayer.body.id) {
            updatePhysics = false;
        }
        setPlayerWithData(body, data, updatePhysics);
    }
}