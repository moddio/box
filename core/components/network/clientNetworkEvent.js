import { io } from 'socket.io-client';
import { NetworkComponent } from './networkComponent';
var socket = io('http://localhost:3001');

export class clientNetworking extends NetworkComponent {
  constructor() {
    super();
    socket.on('connect', () => {
      // creating the player entity on first connection
      let data = {
        type: 'Player',
        isHuman: true,
        name: 'john',
        socketID: socket.id
      };

      // Adding the entity player and unit on the first connection
      this.addEntity(data);
      socket.emit('player-entity', { data });

      // Getting all connected player data on first connection
      socket.on('players', data => {
        console.log('this the player connected', data);
      });
    });
  }
}
