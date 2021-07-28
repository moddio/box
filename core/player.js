import { Entity } from "./entity";

export class Player extends Entity {
  constructor(id, noa) {
    super();
    //console.log("global", global.ControlComponent);
    if (global.isServer) {
      // add other player controls
    } else {
      this.control = new global.ControlComponent(id, noa);
      window.addEventListener("keypress", (e) => {
        this.control.keyPress(e.key);
      });
    }
  }
  setMainUnit(unit) {
    this.mainUnit = unit;
  }

  getMainUnit() {
    return this.mainUnit;
  }
}
