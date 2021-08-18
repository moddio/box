import { Entity } from "./entity";

export class Player extends Entity {
  constructor(data) {
    super();
    this.name = data.name;
    this.clientId = undefined; // socketId

    //console.log("global", global.ControlComponent);
    if (box.isServer) {
      // add other player controls
    } else {
      this.addComponent("ControlComponent");
    }
  }
  
  createUnit() {
    let unit = new box.Unit();
    unit.ownerPlayer = this;
    if (this.mainUnit == undefined) {
      this.mainUnit = unit;
    }
  }    

  tick() {
    super.tick(); // call Entity.tick()
    console.log("this isn't running")
  }
}
