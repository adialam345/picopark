class Connection {
  constructor(id=null, debug=false) {
    this.lastPeerId = null;
    this.peer = null;
    this.peerId = null;
    this.conn = null;
    this.vanityId = id;
    this.debug = debug;
    this.online = false;
    this.joining = undefined;

    this.e = {
      connection:this,
      onConnection:()=>{},
      onOpening:()=>{},
      onDisconnection:()=>{},
      onData:()=>{},
      onConnectionFail:()=>{},
      onClose:()=>{},
    }

    this.send = (d)=>{
      if (this.conn && this.conn.open) {
        this.conn.send(d);
      }
    }
  }

  initialize(id=null) {
    this.joining = id;
    console.log("Initializing connection", this.joining ? "as client" : "as host");
    
    const peerConfig = {
      host: 'peerjs-production-b4a7.up.railway.app',
      port: 443,
      path: '/',
      secure: true,
      debug: 2,
      config: {
        'iceServers': [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun4.l.google.com:19302' },
          {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
          }
        ],
        'iceCandidatePoolSize': 10,
        'iceTransportPolicy': 'all'
      },
      // Add iOS specific options
      serialization: "json",
      reliable: true,
      metadata: { browser: navigator.userAgent }
    };

    try {
      const hostId = this.vanityId || (this.joining ? null : Math.random().toString(36).substring(2, 6).toUpperCase());
      this.peer = new Peer(hostId, peerConfig);
      
      this.peer.on("open", (id) => {
        console.log("PeerJS connection opened with ID:", id);
        this.lastPeerId = id;
        
        if (this.joining) {
          console.log("Attempting to join room:", this.joining);
          this.join(this.joining);
        }
        
        this.e.onOpening();
      });

      this.peer.on("connection", (c) => {
        console.log("New peer connection:", c.peer);
        this.online = true;
        this.conn = c;
        this.conn.connection = this;
        
        c.on('error', (err) => {
          console.error("Connection error:", err);
          this.e.onConnectionFail();
          // Try to reconnect on error
          setTimeout(() => {
            if (this.joining) {
              this.join(this.joining);
            }
          }, 2000);
        });

        this.e.onConnection();
        this.ready();
      });

      this.peer.on("disconnected", () => {
        console.log("Peer disconnected");
        this.online = false;
        this.e.onDisconnection("disconnected");
        
        // More aggressive reconnection strategy
        let reconnectAttempts = 0;
        const maxAttempts = 5;
        const reconnectInterval = setInterval(() => {
          if (reconnectAttempts >= maxAttempts) {
            clearInterval(reconnectInterval);
            console.log("Max reconnection attempts reached");
            return;
          }
          console.log("Attempting to reconnect...", reconnectAttempts + 1);
          this.peer.reconnect();
          reconnectAttempts++;
        }, 1000);
      });

      this.peer.on("close", () => {
        console.log("Peer connection closed");
        this.conn = null;
        this.online = false;
        this.e.onClose();
        // Try to reinitialize on close
        setTimeout(() => {
          this.initialize(this.joining);
        }, 2000);
      });

      this.peer.on("error", (err) => {
        console.error("Peer error:", err);
        this.online = false;
        this.e.onConnectionFail();
        
        // Handle specific iOS WebRTC errors
        if (err.type === 'network' || err.type === 'peer-unavailable') {
          setTimeout(() => {
            console.log("Retrying connection after error...");
            this.initialize(this.joining);
          }, 2000);
        }
      });
    } catch (error) {
      console.error("Error initializing peer:", error);
      // Retry initialization after error
      setTimeout(() => {
        this.initialize(this.joining);
      }, 2000);
    }
  }

  ready() {
    if (!this.conn) return;
    
    this.conn.on("data", (data) => {
      this.e.onData(data);
    });

    this.conn.on("close", () => {
      this.online = false;
      this.e.onClose();
      this.conn = null;
    });
  }

  join(id) {
    if (!this.peer) {
      console.error("Peer not initialized");
      return;
    }
    
    const peerId = id.toString().toUpperCase();
    console.log("Attempting to join peer:", peerId);

    try {
      this.conn = this.peer.connect(peerId, {
        reliable: true,
        serialization: "json",
        metadata: { 
          type: 'client',
          browser: navigator.userAgent
        }
      });

      if (!this.conn) {
        console.error("Failed to create connection");
        setTimeout(() => this.join(id), 2000);
        return;
      }

      this.conn.connection = this;

      this.conn.on("open", () => {
        console.log("Connection opened successfully to:", peerId);
        this.online = true;
        this.e.onConnection();
        this.ready();
      });

      this.conn.on("data", (data) => {
        console.log("Received data from host:", data);
        this.e.onData(data);
      });

      this.conn.on("error", (err) => {
        console.error("Connection error for peer " + peerId + ":", err);
        this.online = false;
        this.e.onConnectionFail();
        // Retry connection on error
        setTimeout(() => this.join(id), 2000);
      });

      this.conn.on("close", () => {
        console.log("Connection closed to peer:", peerId);
        this.online = false;
        this.e.onClose();
        // Retry connection on close
        setTimeout(() => this.join(id), 2000);
      });
    } catch (error) {
      console.error("Error joining peer " + peerId + ":", error);
      this.e.onConnectionFail();
      // Retry on error
      setTimeout(() => this.join(id), 2000);
    }
  }

  log(c) {
    if(this.debug) console.log(c);
  }
}

class Connection2W {
  constructor() {
    this.connS2T = null;
    this.connT2S = null;
    this.selfId = null;
    this.fullyConnected = false;
    this.lastPing = 0;

    this.e = {
      connection: this,
      onConnection: () => {},
      onOpening: () => {},
      onDisconnection: () => {},
      onData: () => {},
      onConnectionFail: () => {},
      onClose: () => {},
    }
  }

  open(id = null, twC = false) {
    this.selfId = id;
    this.connS2T = new Connection(id);
    this.connS2T.twC = this;

    this.connS2T.e.onOpening = () => {
      this.e.onOpening();
    }

    this.connS2T.e.onConnection = () => {
      this.fullyConnected = true;
      this.e.onConnection();
    }

    this.connS2T.e.onData = (d) => {
      this.processData(d);
    }

    this.connS2T.e.onDisconnection = (e) => {
      this.fullyConnected = false;
      this.e.onDisconnection(e);
    }

    this.connS2T.initialize();
  }

  connect(id, twC = false) {
    this.connT2S = new Connection();
    this.connT2S.twC = this;

    if (!twC) {
      this.connT2S.e.onConnection = () => {
        this.open(null, true);
        this.connS2T.e.onOpening = () => {
          var newId = this.connS2T.lastPeerId;
          this.connT2S.send(JSON.stringify({
            connectToNow: newId,
            content: JSON.stringify({}),
          }));
        }
      }
    } else {
      this.connT2S.e.onConnection = () => {
        this.fullyConnected = true;
        this.e.onConnection();
      }
    }

    this.connT2S.e.onConnectionFail = () => {
      this.e.onConnectionFail();
    }

    this.connT2S.e.onClose = () => {
      this.e.onClose();
    }

    this.connT2S.initialize(id);
  }
  
  processData(d) {
    try {
      if (!d) return;
      let parsedData = JSON.parse(d);

      if (parsedData.ping) {
        const ping = (new Date()).getTime() - parsedData.ping;
        const averageStrength = 10;
        this.lastPing = ((this.lastPing * averageStrength) + ping) / (averageStrength + 1);
      }

      if (parsedData.connectToNow) {
        this.connect(parsedData.connectToNow, true);
        return;
      }

      if (parsedData.content !== undefined) {
        this.e.onData(parsedData.content, parsedData);
      }
    } catch (err) {
      console.error("Error processing data:", err);
    }
  }

  send(d, raw = false) {
    try {
      if (!this.fullyConnected) {
        console.warn("Connection not fully established");
        return;
      }

      const data = raw ? d : JSON.stringify({
        content: d,
        ping: (new Date()).getTime(),
      });

      if (this.connT2S && this.connT2S.conn) {
        this.connT2S.send(data);
      } else if (this.connS2T && this.connS2T.conn) {
        this.connS2T.send(data);
      }
    } catch (err) {
      console.error("Error sending data:", err);
    }
  }
}


function parsePlayerData(player) {
  return {
    position:player.body.position,
    id:player.body.id,
    direction:player.direction,
    keys:player.keys,
    frame:player.frame,
    color:player.color,
    scale:player.scale,
    ready:player.ready,
    shields:player.hasShield,
    dead:player.dead,
  }
}

function setPlayerWithData(player, data, updatePhysics=true) {
  if (!player || !data) return;

  try {
    // Only update physics (position/movement) if updatePhysics is true
    if (updatePhysics) {
      if (data.position) {
        Matter.Body.setPosition(player.body, data.position);
      }
      if (data.velocity) {
        Matter.Body.setVelocity(player.body, data.velocity);
      }
      if (data.direction !== undefined) {
        player.direction = data.direction;
      }
    }

    // Always update non-physics properties
    if (data.keys && !window.hostConnection) {
      player.updateKeys(data.keys);
    }
    if (data.color !== undefined) {
      player.color = data.color;
    }
    if (data.frame !== undefined) {
      player.frame = data.frame;
    }
    if (data.ready !== undefined) {
      player.ready = data.ready;
    }
    if (data.shields !== undefined) {
      player.hasShield = data.shields;
    }
    if (data.dead !== undefined) {
      player.dead = data.dead;
    }
    if (data.scale !== undefined) {
      player.setScale(data.scale);
    }
  } catch (err) {
    console.error('Error updating player data:', err);
  }
}