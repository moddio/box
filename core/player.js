import { ControlComponent } from "../core/components/control/controlComponent";
import { Entity } from "./entity";

export class Player extends Entity {
  constructor(id, noa) {
    super();
    if (global.isServer) {
      // add other player controls
    } else {
      this.control = new ControlComponent(id, noa);
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
