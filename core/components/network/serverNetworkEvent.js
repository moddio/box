class ServerNetworkEvents {
  constructor(io) {
    this.players = {};
    this.units = {};

    io.on('connection', socket => {
      // creating the player entity on first connection
      console.log('CONNECTION', socket.id)
      let data = {
        type: 'Player',
        isHuman: true,
        name: socket.id,
        socketID: socket.id
      };

      // Adding the entity player and unit on the first connection
      const player = BOX.Engine.addEntity(data);
      let spawnRegion = BOX.Engine.getEntityByName('player_spawn');
      let spawnPosition = spawnRegion.getRandomPosition();
      const unit = player.createUnit(spawnPosition);

       console.log('DATA', data);
      data.position = spawnPosition;

      this.players[socket.id] = data;
      //console.log(data, this.players[socket.id])

      //this.units[socket.id]


      //console.log('player entity in the server', this.players[socket.id]);

      // Getting the player data on first connection
      socket.on('player-entity', data => {
        //this.playerConnected.push(data);
        //console.log('this is the player entity data', this.playerConnected);
      });

      // Handling diconnect of the players
      socket.on('disconnect', () => {
        // Filter out the connected players
        //this.playerConnected = this.playerConnected.filter(({ data }) => data.socketID !== socket.id);
        console.log('player-disconnected', socket.id);
        //console.log('this is the player entity data', this.playerConnected);
      });

      // On new connection the player will get all connected players
      socket.emit('players', this.players);
      //console.log(this.players)
      socket.broadcast.emit('newPlayer', data);

      //listen for new unit created
      socket.on('new-unit', data => {
        //this.units.push(data);
        //console.log('new unit created', this.units);

        // Socket emit to online player new unit data
        //socket.broadcast.emit('new-unit', data);
      });
    });

    // implement the below.
    // io.on("keyPress", data, function() {
    //   let player = BOX.Engine.players[socket.id];
    //   player.components['ControlComponent'].keyPress(key)
    // })
  }
  broadcast(msgType, data) {
    // broadcast creation of this entity to all clients
    for (let id in BOX.Engine.clients) {
      // stream entity creation with entity data
      let client = BOX.Engine.clients[id];
      // socket.emit(data, client.socketId)
    }
  }
}

module.exports = { ServerNetworkEvents };
