import { Entity } from "./entity";

export class Player extends Entity {
  constructor() {
    super();
    const { Box } = box;
    //console.log("global", global.ControlComponent);
    if (Box.isServer) {
      // add other player controls
    } else {
      //console.log("control tewdwedewdew", controlComponent);
      //this.control = new controlComponent.ControlComponent(id);
      this.addComponent("ControlComponent");
    }
  }
  setMainUnit(unit) {
    this.mainUnit = unit;
  }

  getMainUnit() {
    return this.mainUnit;
  }
}
