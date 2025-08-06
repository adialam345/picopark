class Connection {
  constructor(id=null, debug=false) {
    this.lastPeerId = null;
    this.peer = null; // Own peer object
    this.peerId = null;
    this.conn = null;
    this.vanityId = id;
    this.retryCount = 0;
    this.maxRetries = 3;

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

    this.online = false;
    this.joining = undefined;
    this.debug = debug;
  }

  log(c) {
    if(this.debug) console.log(c);
  }

  generateRandomId() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  initialize(id=null) {
    this.joining = id;
    
    // Create own peer object with connection to shared PeerJS server
    const peerConfig = {
      debug: 2,
      host: '9dbd837dd33c.ngrok-free.app',
      port: 443,
      path: '/myapp',
      secure: true,
      config: {
        'iceServers': [
          { urls: 'stun:stun.l.google.com:19302' }
        ]
      }
    };

    // Use provided ID or generate random one
    this.peer = new Peer(this.vanityId || this.generateRandomId(), peerConfig);
    this.peer.connection = this;

    this.peer.on("open", function (id) {
      // Reset retry count on successful connection
      this.connection.retryCount = 0;
      
      if (this.id === null) {
        this.id = this.connection.lastPeerId;
      } else {
        this.connection.lastPeerId = this.id;
      }

      if (this.connection.joining) {
        this.connection.join(this.connection.joining);
      }
      
      this.connection.log("Connected with ID: " + this.connection.lastPeerId);
      this.connection.e.onOpening();
    });

    this.peer.on("connection", function (c) {
      this.connection.online = true;
      this.connection.log("Connected to: " + c);

      if (this.connection.conn && this.connection.conn.open) {
        c.on("open", function () {
          c.send("Already connected to another client");
          setTimeout(function () {
            c.close();
          }, 500);
        });
        return;
      }

      this.connection.conn = c;
      this.connection.conn.connection = this.connection;
      this.connection.e.onConnection();
      this.connection.ready();
    });

    this.peer.on("destroyed", function () {
      console.error("peer destroyed");
      this.connection.online = false;
      this.connection.e.onDisconnection("destroy");
    });

    this.peer.on("disconnected", function () {
      console.log("peer disconnected, attempting reconnect...");
      this.connection.e.onDisconnection("disconnected");
      this.connection.online = false;
      
      // Attempt reconnect with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, this.connection.retryCount), 10000);
      setTimeout(() => {
        if (!this.destroyed && this.connection.retryCount < this.connection.maxRetries) {
          this.connection.retryCount++;
          this.reconnect();
        }
      }, delay);
    });

    this.peer.on("close", function () {
      console.error("peer closed");
      this.connection.e.onClose();
      this.connection.conn = null;
      this.connection.online = false;
    });

    this.peer.on("error", function (err) {
      console.error("peer error:", err);
      
      if (err.type === 'unavailable-id') {
        console.log("ID taken, generating new ID...");
        this.connection.vanityId = this.connection.generateRandomId();
        setTimeout(() => {
          if (this.connection.retryCount < this.connection.maxRetries) {
            this.connection.retryCount++;
            this.connection.initialize();
          } else {
            this.connection.e.onConnectionFail();
          }
        }, 1000);
      } else {
        this.connection.e.onConnectionFail();
      }
      
      this.connection.online = false;
    });
  }

  ready() {
    this.conn.on("data", function (data) {
      this.connection.e.onData(data);
    });
    
    this.conn.on("close", function () {
      console.error("connection closed");
      this.connection.online = false;
      this.connection.e.onClose();
      this.conn = null;
    });
  }

  join(id) {
    if (!this.peer || this.peer.destroyed) {
      console.error("Peer not initialized");
      return;
    }

    try {
      this.conn = this.peer.connect(id, {
        reliable: true
      });
      
      if (!this.conn) {
        console.error("Connection failed");
        return;
      }

      this.conn.connection = this;

      this.conn.on("open", function () {
        this.connection.e.onConnection();
      });

      this.conn.on("error", function(err) {
        console.error("Connection error:", err);
        this.connection.e.onConnectionFail();
      });
    } catch (err) {
      console.error("Join error:", err);
      this.e.onConnectionFail();
    }
  }
}

class Connection2W {
  constructor() {
    this.connS2T;
    this.connT2S;
    this.selfId;
    this.fullyConnected = false;

    this.lastPing = 0

    this.e = {
      connection:this,
      onConnection:()=>{},
      onOpening:()=>{},
      onDisconnection:()=>{},
      onData:()=>{},
      onConnectionFail:()=>{},
      onClose:()=>{},
      
    }

  }
  connectionEvents(conn) {
    conn.e.onDisconnection = (e)=>{
      this.fullyConnected = false
      this.e.onDisconnection(e)
    }
  }
  open(id=null, twC=false) {
    this.selfId = id
    this.connS2T = new Connection(id)
    this.connS2T.twC = this
    this.connectionEvents(this.connS2T)
    this.connS2T.initialize()
    this.connS2T.e.onOpening=function(){
      this.connection.twC.e.onOpening()
      console.log("opened joinConn on id: ",this.connection.lastPeerId)
      

    }
    if (twC) {

      this.connS2T.e.onConnection=function(){
        this.connection.twC.fullyConnected = true
        this.connection.twC.e.onConnection()
        console.log("fullyConnected")
      }


    }
    this.connS2T.e.onData=function(d) {
      let self = this.connection.twC
      self.processData(d)
    }
    this.connS2T.e.onClose=()=>{
      
      this.e.onClose()
    }

    
    
  }
  connect(id, twC=false) {
    this.connT2S = new Connection()
    this.connT2S.twC = this
    this.connectionEvents(this.connT2S)
    this.connT2S.initialize(id)
    if (!twC) {
        this.connT2S.e.onConnection=function(){
        this.connection.twC.open(null, true)
        this.connection.twC.connS2T.e.onOpening=function(){
          var newId = this.connection.twC.connS2T.lastPeerId
          this.connection.twC.connT2S.send(JSON.stringify({
            connectToNow:newId,
            content:JSON.stringify({}),
          }))

        }

      }
    } else {
      
      this.connT2S.e.onConnection=function(){
        this.connection.twC.fullyConnected = true
        this.connection.twC.e.onConnection()
        console.log("fullyConnected")

      }
      
    }
    this.connT2S.e.onConnectionFail=()=>{
      this.e.onConnectionFail()
    }
    this.connT2S.e.onClose=()=>{
      this.e.onClose()
    }


  }

  terminate(twC=false) {
    try {
      if (!twC) {
        // Send termination signal to peer if we're initiating the termination
        this.send(JSON.stringify({terminate:true}), true);
      }

      // Safely destroy connections with proper cleanup
      const cleanup = () => {
        if (this.connT2S && this.connT2S.peer) {
          this.connT2S.peer.destroy();
          this.connT2S = null;
        }
        if (this.connS2T && this.connS2T.peer) {
          this.connS2T.peer.destroy();
          this.connS2T = null;
        }
        this.fullyConnected = false;
      };

      // Use Promise to ensure proper cleanup sequence
      Promise.resolve()
        .then(() => {
          cleanup();
          this.e.onDisconnection("terminated");
        })
        .catch(err => {
          console.error("Termination error:", err);
          cleanup(); // Ensure cleanup happens even if there's an error
        });
    } catch (err) {
      console.error("Error during termination:", err);
      this.e.onDisconnection("error");
    }
  }
  
  processData(d) {
    try {
      if (!d) return;
      
      let parsedData;
      try {
        parsedData = JSON.parse(d);
      } catch (err) {
        console.error("Error parsing data:", err);
        return;
      }

      // Handle ping
      if (parsedData.ping) {
        const ping = (new Date()).getTime() - parsedData.ping;
        const averageStrength = 10;
        this.lastPing = ((this.lastPing * averageStrength) + ping) / (averageStrength + 1);
      }

      // Handle connection request
      if (parsedData.connectToNow) {
        this.connect(parsedData.connectToNow, true);
        return;
      }

      // Handle termination request
      if (parsedData.terminate) {
        this.terminate(true);
        return;
      }

      // Handle regular content
      if (parsedData.content !== undefined) {
        this.e.onData(parsedData.content, parsedData);
      }
    } catch (err) {
      console.error("Error processing data:", err);
    }
  }

  send(d, raw=false) {
    try {
      if (!this.fullyConnected) {
        console.warn("2 way not fully connected");
        return;
      }

      if (!this.connT2S) {
        console.warn("Connection not available");
        return;
      }

      const data = raw ? d : JSON.stringify({
        content: d,
        ping: (new Date()).getTime(),
      });

      this.connT2S.send(data);
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