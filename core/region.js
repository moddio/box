import { Entity } from './entity';

export class Region extends Entity {
  constructor(data) {
    data.type = 'region';
    super(data); // run Entity's constructor

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
  getRandomPosition () {
    
    let Xrandom = Math.random() * this.mesh.scaling.x;
    let Yrandom = Math.random() * this.mesh.scaling.y;
    let Zrandom = Math.random() * this.mesh.scaling.z;

    

    let position = {
        x: this.mesh.position.x + Xrandom - (this.mesh.scaling.x / 2),
        y: this.mesh.position.y + Yrandom - (this.mesh.scaling.y / 2),
        z: this.mesh.position.z + Zrandom - (this.mesh.scaling.z / 2)
    };

    console.log('Random position', position)

    return position;
  }

  destroy() {
    super.destroy();
  }

  tick() {
    super.tick(); // call Entity.tick()

  }
}

export default Region;
