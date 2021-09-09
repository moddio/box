const { NetworkComponent } = require('./networkComponent');

class clientNetworking extends NetworkComponent {
  constructor() {
    super();
    BOX.socket.on('connect', () => {
      BOX.socket.on('addEntity', data => {
        BOX.Engine.addEntity(data);
      });

      //NOT WORKING YET
      BOX.socket.on('removeEntity', entityId => {
        BOX.Engine.removeEntity(entityId);
      });

      //MY SUGGESTION FOR CLIENT FIRST CONNECTION - NOT WORKING YET
      BOX.socket.on('addAllEntities', data => {
        data.forEach(element => {
          BOX.Engine.addEntity(element);
        }); 
      });

      



      //WILL BE REMOVED

      BOX.socket.on('remove-player', socketId => {
        this.removeEntity(socketId);
      });

      // Getting all connected player data on first connection
      BOX.socket.on('players', playersData => {
        Object.values(playersData).forEach((playerData, index) => {
          // Create our own players unit
          let isMyUnit;
          if (playerData.socketID === BOX.socket.id) {
            isMyUnit = true;
            const player = BOX.Engine.addEntity(playerData);
            player.createUnit(playerData.position);
          } else {
            // Create other players unit
            const player = BOX.Engine.addEntity({
              type: 'Player',
              position: playerData.position,
              isMyUnit: false,
              ownerPlayer: null,
              doPhysics: true,
              name: playerData.name,
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
            });
            this.players[playerData.socketID] = player;
            //player.addComponent('NameLabelComponent');
          }
        });
      });

      // Listen on new player connected
      /*BOX.socket.on('newPlayer', playerData => {
        const player = BOX.Engine.addEntity({
          type: 'Player',
          position: playerData.position,
          isMyUnit: false,
          ownerPlayer: null,
          doPhysics: true,
          name: playerData.name,
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
        });
        this.players[playerData.socketID] = player;*/
        //player.addComponent('NameLabelComponent');
      //});

      // listen for new unit
      //BOX.socket.on('new-unit', data => {
      //});
    });
  }
}

module.exports = { clientNetworking };
