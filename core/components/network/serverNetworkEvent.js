class ServerNetworkEvents {
  constructor(io) {
    this.players = {};
    this.entities = {}; //maybe use BOX.Engine.entities ?

    BOX.io = io;
    io.on('connection', socket => {
      // Handling disconnect of the players
      socket.on('disconnect', () => {
        Object.values(BOX.Engine.entities).forEach(entity => {
          if (entity.socketID == socket.id) {
            entity.destroy();
            delete this.players[socket.id];
          }
        });
      });

      let spawnRegion = BOX.Engine.getEntityByName('player_spawn');
      let spawnPosition = spawnRegion.getRandomPosition();
      // Creating the player entity on first connection
      let data = {
        type: 'Player',
        isHuman: true,
        name: socket.id,
        socketID: socket.id,
        position: spawnPosition
      };

      // Adding the entity player and unit on the first connection
      const player = BOX.Engine.addEntity(data);

      socket.emit('addAllEntities', this.players);

      const unit = player.createUnit();

      //We need it for now because we also need to create units for players
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
      socket.emit('addAllEntities', units); //send to new clients all units

      this.players[socket.id] = data; //adding new player - may be we dont need this?
      //my suggestion
      /*
      let enititiesData = [];
      Object.values(BOX.Engine.entities).forEach(entity => { 
        let entityData = entity.getData();
        enititiesData.push(entityData);
      });
      socket.emit('addAllEntities', enititiesData);
      */
      /*let testunit = {
        type: 'Unit',
        name: data.socketID,
        socketID: data.socketID,
        position: data.position,
        body: 'default'
      };
      units[testunit.socketID] = testunit;*/
      //io.emit('addEntity', testunit);
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
