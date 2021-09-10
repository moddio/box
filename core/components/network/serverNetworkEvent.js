class ServerNetworkEvents {
  constructor(io) {
    this.players = {};
    this.units = [];

    io.on('connection', socket => {
      // Handling disconnect of the players
      socket.on('disconnect', () => {
        // Remove the player entity in the server
        delete this.players[socket.id];
        socket.broadcast.emit('remove-player', socket.id);
      });

      // Creating the player entity on first connection
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
      this.units.push(unit);
      data.position = spawnPosition;
    

      io.emit('addEntity', data);

      socket.emit('addAllEntities', this.players) //TEMPORARY

      this.players[socket.id] = data;
      data.type = 'Unit';
      data.body = 'default';
      io.emit('addEntity', data);


      // Getting the player data on first connection
      /*socket.on('player-entity', data => {});

      // On new connection the player will get all connected players
      socket.emit('players', this.players);
      io.emit('addEntity', data);

      // Borodcast new entity to the players
      //socket.broadcast.emit('newPlayer', data);
      data.type = 'Unit';
      data.body = 'default';
      socket.broadcast.emit('addEntity', data);*/
    });

    // <---TODO :-->
    // implement the below.
    // io.on("keyPress", data, function() {
    //   let player = BOX.Engine.players[socket.id];
    //   player.components['ControlComponent'].keyPress(key)
    // })
  }

  // <---------------We don't need to use broadcast because it's built in in socket io ----------------------->
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
