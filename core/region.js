import { Entity } from './entity';

export class Region extends Entity {
  constructor(data) {
    data.type = 'Region';
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
  }

  //get random position in region
  getRandomPosition () {

  }

  destroy() {
    super.destroy();
  }

  tick() {
    super.tick(); // call Entity.tick()

  }
}

export default Region;
