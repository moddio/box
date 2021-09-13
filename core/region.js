const { Entity } = require('./entity');

class Region extends Entity {
  constructor(data) {
    data.type = 'Region';
    super(data); // run Entity's constructor
    this.position = data.position;
    this.scaling = data.scaling;

    if (BOX.isClient) this.mesh.visibility = 0;

    /*if (data.streamMode == undefined) {
      this.streamMode = {
        enabled: true,
        stateChange: true,
        attributes: true,
        movement: true,
        csp: true // this unit's owner player will ignore the server streaming received for his own unit
      };
    }*/

    //this.getRandomPosition();
  }

  //get random position in region
  getRandomPosition() {
    let Xrandom = Math.random() * this.scaling.x;
    let Yrandom = Math.random() * this.scaling.y;
    let Zrandom = Math.random() * this.scaling.z;

    let position = {
      x: this.position.x + Xrandom - this.scaling.x / 2,
      y: this.position.y + Yrandom - this.scaling.y / 2,
      z: this.position.z + Zrandom - this.scaling.z / 2
    };

    console.log('Random position', position);

    return position;
  }

  destroy() {
    super.destroy();
  }

  tick() {
    super.tick(); // call Entity.tick()
  }
}

module.exports = { Region };
