class Host {
    constructor(game) {
        this.game = game
        this.connections = []
        let wordsf = words.filter(a=>{return a.length==4})
        this.id = wordsf[randInt(0, wordsf.length)].toUpperCase()
        this.roomJoinOnline = false
        this.opening = true
        this.maxPlayers = 4 // Maximum number of players allowed
    }

    init() {
        this.setupJoinConnection()
    }

    setupJoinConnection() {
        this.joinConn = new Connection2W()
        this.joinConn.open(this.id)

        this.joinConn.e.onOpening = ()=>{
            setRoomCode(this.joinConn.selfId)
            this.opening = false
        }

        this.joinConn.e.onConnection = ()=>{
            // Check if room is full
            if (this.connections.length >= this.maxPlayers) {
                this.joinConn.send(JSON.stringify({
                    error: "Room is full"
                }))
                return
            }

            document.getElementById("incoming").textContent = " (incoming connection)"
            var newConnection = this.openConnection()
            
            newConnection.e.onOpening = ()=>{
                this.joinConn.send(JSON.stringify({
                    reconnectToThis: newConnection.connS2T.lastPeerId,
                }))
            }
        }

        this.joinConn.e.onDisconnection = ()=>{
            // Only create new join connection if the current one is disconnected
            if (this.joinConn.connS2T.disconnected) {
                setTimeout(() => {
                    this.setupJoinConnection()
                }, 1000)
            }
        }
    }

    broadcast(data) {
        this.connections.forEach(conn => {
            if (conn && !conn.unloaded) {
                try {
                    conn.send(data)
                } catch (e) {
                    console.error('Failed to send to client:', e)
                }
            }
        })
    }

    closeConnection(conn) {
        const index = this.connections.findIndex(c => c.selfId === conn.selfId)
        if (index !== -1) {
            const connection = this.connections[index]
            connection.unloaded = true
            this.connections.splice(index, 1)
            
            if (connection.clientUsername) {
                removePlayerFromMenu(connection.clientUsername)
            }
        }
    }

    openConnection() {
        var connection = new Connection2W()
        connection.open()

        connection.e.onData = (d)=>{
            try {
                d = JSON.parse(d)
                if (d.player) {
                    connection.player = this.updateClientBody(d.player, connection)
                }
                if (d.keycode && connection.player) {
                    connection.player.keys[d.keycode.code] = d.keycode.value
                    if (d.playerState) {
                        Matter.Body.setPosition(connection.player.body, d.playerState.position)
                        if (d.playerState.velocity) {
                            Matter.Body.setVelocity(connection.player.body, d.playerState.velocity)
                        }
                    }
                }
                if (d.setUsername) {
                    connection.clientUsername = d.setUsername
                    addPlayerToMenu(d.setUsername)
                }
            } catch (e) {
                console.error('Error processing client data:', e)
            }
        }

        connection.e.onConnection = ()=>{
            document.getElementById("incoming").textContent = ""
        }

        connection.e.onClose = ()=>{
            if (connection.player) {
                connection.player.color = "red"
                connection.player.unload()
            }
            this.closeConnection(connection)
        }
       
        this.connections.push(connection)
        return connection
    }

    updateClientBody(data, conn) {
        var findPlayerById = (id) => {
            for (let i = 0; i < this.game.players.length; i++) {
                const player = this.game.players[i];
                if (player.body.id == id) return player;
            }
            return null;
        }

        if (!data || !data.id) {
            console.warn('Invalid player data received');
            return null;
        }

        var foundPlayer = findPlayerById(data.id);
        
        if (!foundPlayer) {
            // Create new player if not found
            foundPlayer = mainGame.playerhandler.addPlayer({
                bodyOptions: {
                    id: data.id,
                },
                color: this.game.fetchColor(),
            });
            foundPlayer.onlinePlayer = true;
        }

        // Update connection references
        conn.clientBody = foundPlayer;
        foundPlayer.conn = conn;

        // Update player state
        if (data.position) {
            Matter.Body.setPosition(foundPlayer.body, data.position);
        }
        if (data.velocity) {
            Matter.Body.setVelocity(foundPlayer.body, data.velocity);
        }
        if (data.direction !== undefined) {
            foundPlayer.direction = data.direction;
        }
        if (data.keys) {
            foundPlayer.keys = data.keys;
        }
        if (data.color) {
            foundPlayer.color = data.color;
        }
        if (data.scale) {
            foundPlayer.setScale(data.scale);
        }
        if (data.ready !== undefined) {
            foundPlayer.ready = data.ready;
        }
        if (data.shields !== undefined) {
            foundPlayer.hasShield = data.shields;
        }
        if (data.dead !== undefined) {
            foundPlayer.dead = data.dead;
        }

        return foundPlayer;
    }
    

    updateClients() {
        for (let i = 0; i < this.connections.length; i++) {
            const conn = this.connections[i];
            if (conn.fullyConnected) {
                conn.send(
                    JSON.stringify({
                        playerData:this.getPlayersData(),
                        syncData:this.game.syncHandler.getSyncData(),
                    })
                )
            }
        }
    }
    getPlayersData() {
        var returnOb = []
        for (let i = 0; i < this.game.players.length; i++) {
            returnOb.push(this.getPlayerData(this.game.players[i]))
            
        }

        return returnOb


    }
    getPlayerData(p) {
        return parsePlayerData(p)
    }
}