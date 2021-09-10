class ServerNetworkEvents {
  constructor(io) {
    this.players = {};
    
    io.on('connection', socket => {
      // Handling disconnect of the players
      socket.on('disconnect', () => {
        // Remove the player entity in the server
        delete this.players[socket.id];
        socket.broadcast.emit('remove-player', socket.id);
      });


      // GAME LOGIC BELOW:

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

      let unitData = {
        type: 'Unit',
        position: spawnRegion.getRandomPosition(),
        isMyUnit: true,
        ownerPlayer: this,
        doPhysics: true,
        body: {
          type: 'CreateBox',
          offset: [0, 0.5, 0],
          radius: 0.2,
          width: 5,
          height: 8,
          roundShap: [null, null],
          scaling: { x: 0.6, y: 1, z: 0.6 },
          linearDamping: 0.5,
          friction: 0
        }
      };

      player.createUnit(unitData);
    });

    // <---TODO :-->
    // implement the below.
    // io.on("keyPress", data, function() {
    //   let player = BOX.Engine.players[socket.id];
    //   player.components['ControlComponent'].keyPress(key)
    // })
  }

}

module.exports = { ServerNetworkEvents };
