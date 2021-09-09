const { Component } = require('../component');

class NetworkComponent extends Component {
  constructor(parent) {
    super(parent);
    this.players = {};
    this.snapshot = [];
    this.clients = {};
  }
  // <--- We don't need this also ------>
  broadcast(msgType, data) {
    // broadcast creation of this entity to all clients
    for (let id in BOX.Engine.clients) {
      // stream entity creation with entity data
      let client = BOX.Engine.clients[id];
      // socket.emit(data, client.socketId)
    }
  }

  // DELETE EVERYTHING BELOW!

  addEntity(data) {
    // Create my own unit by default
    let myPlayer = BOX.Engine.addEntity(data);
    myPlayer.createUnit();

    return myPlayer;
  }

  addUnit(data) {
    let spawnRegion = BOX.Engine.getEntityByName('player_spawn');
    let spawnPosition = spawnRegion.getRandomPosition();
    let unit = BOX.Engine.addEntity({
      position: { x: data.x, y: data.y, z: data.z },
      type: 'Projectile',
      doPhysics: true,
      body: {
        offset: [0, 0.5, 0],
        type: 'CreateSphere',
        unitName: 'ball',
        width: 1,
        height: 1,
        radius: 0.2,
        roundShap: [6, 0.4],
        restitution: 0.8,
        friction: 0.7
      }
    });
  }

  removeEntity(socketId) {
    BOX.Engine.removeEntity(socketId, this.players[socketId].noaEntityId);
    delete this.players[socketId];
  }
  // create snapshot
}

module.exports = { NetworkComponent };
