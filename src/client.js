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
    }
    init(roomId) {
        this.roomConn = new Connection2W()
        this.roomConn.connect(roomId)

        this.roomConn.e.onData = (d)=>{
            this.processData(d)
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
                        this.mainConn.send(JSON.stringify({
                            setUsername:this.username
                        }));
                    };
                }
                if (d.playerData) {
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
                if (d.restartLevel) {
                    const currentLevel = this.game.levelHandler.currentLevel;
                    if (currentLevel && currentLevel.name) {
                        this.game.levelHandler.setLevel(currentLevel.name);
                    } else {
                        console.warn('Cannot restart level: current level is undefined');
                    }
                }
            }
        } catch (err) {
            console.error('Error processing data:', err);
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
        
        for (let i = 0; i < players.length; i++) {
            const playerData = players[i];
            var playerId = playerData.id;

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