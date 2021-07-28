import { Entity } from "./entity";

export class Player extends Entity {
  constructor() { // pass engine
    super();
    //console.log("global", global.ControlComponent);
    if (box.isServer) {
      // add other player controls
    } else if (box.isClient) {
      this.addComponent("controlComponent");
    }
  }

  setMainUnit(unit) {
    this.mainUnit = unit;
  }

  getMainUnit() {
    return this.mainUnit;
  }
}
