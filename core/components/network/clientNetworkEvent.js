import { NetworkComponent } from './networkComponent';

export class clientNetworking extends NetworkComponent {
  
  constructor() {
    super();
    BOX.socket.on('connect', () => {

      
      // BOX.socket.on('addEntity', data => {
      //   BOX.Engine.addEntity(data)
      // });

      // BOX.socket.on('gameState', data => {
      //   for (id in data) {
      //     BOX.Engine.addEntity(data[id])
      //   }
      // });

      // DELETE EVERYTHING BELOW!!

      // creating the player entity on first connection
      let data = {
        type: 'Player',
        isHuman: true,
        name: BOX.socket.id,
        socketID: BOX.socket.id
      };

      // Adding the entity player and unit on the first connection
      this.addEntity(data);
      BOX.socket.emit('player-entity', { data });

      // Getting all connected player data on first connection
      BOX.socket.on('players', data => {
        console.log('this the players connected', data);
        for (let elem in data) {
          let spawnRegion = BOX.Engine.getEntityByName('player_spawn');
          let spawnPosition = spawnRegion.getRandomPosition();

          let player = BOX.Engine.addEntity({
            type: 'Player',
            position: spawnPosition,
            isMyUnit: false,
            ownerPlayer: null,
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
          });
          console.log('sddcsdcsdcsdcdscdsc', player);
          player.addComponent('NameLabelComponent');

          console.log('logging the player', player);
        }
      });

      // listen for new unit
      BOX.socket.on('new-unit', data => {
        this.addUnit(data.position);
        //this.addUnit()
      });
    });
  }
}
