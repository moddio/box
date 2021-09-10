class ServerNetworkEvents {
  constructor(io) {
    this.players = {};
    this.units = [];

    io.on('connection', socket => {
      // Handling disconnect of the players
      socket.on('disconnect', () => {
        console.log('logging the playerxxxxxxxxxxxxxxxxx', this.players);
        socket.emit('removeEntity', socket.id);
        socket.broadcast.emit('removeEntity', socket.id);
        let idTest = BOX.Engine.getEntityBySocketID(socket.id);
        BOX.Engine.removeEntity(idTest, false);
        delete this.players[socket.id];
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

      socket.emit('addAllEntities', this.players); //TEMPORARY

      let units = {};
      Object.values(this.players).forEach((elem, index) => {
        let testunit = {
          type: 'Unit',
          name: elem.socketID,
          socketID: elem.socketID,
          position: elem.position,
          body: 'default'
        };
        units[testunit.socketID] = testunit;
      });
      socket.emit('addAllEntities', units); //TEMPORARY

      this.players[socket.id] = data;

      let testunit = {
        type: 'Unit',
        name: data.socketID,
        socketID: data.socketID,
        position: data.position,
        body: 'default'
      };
      units[testunit.socketID] = testunit;
      io.emit('addEntity', testunit);

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
