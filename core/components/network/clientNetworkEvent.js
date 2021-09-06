import { NetworkComponent } from './networkComponent';

export class clientNetworking extends NetworkComponent {
  constructor() {
    super();
    BOX.socket.on('connect', () => {
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
        console.log('this the player connected', data);
      });
    });
  }
}
