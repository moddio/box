import { Component } from '../component';

export class NetworkComponent extends Component {
  constructor(parent) {
    super(parent);
    this.snapshot = [];
    this.clients = {};
  }

  addEntity(data) {
    // Create my own unit by default
    let myPlayer = BOX.Engine.addEntity(data);
    myPlayer.createUnit();

    return myPlayer;
  }

  removeEntity() {
    // broadcast removal of this entity to all clients
  }
  // create snapshot
}
