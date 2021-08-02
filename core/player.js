import { Entity } from "./entity";

export class Player extends Entity {
  constructor(data) {
    super();
    this.name = data.name;
    //console.log("global", global.ControlComponent);
    if (box.isServer) {
      // add other player controls
    } else (box.isClient){
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
