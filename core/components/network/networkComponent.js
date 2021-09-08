const { Component } = require('../component');

class NetworkComponent extends Component {
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
    console.log('unit', unit);
  }

  removeEntity() {
    // broadcast removal of this entity to all clients
  }
  // create snapshot
}

module.exports = { NetworkComponent };
