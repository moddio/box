export class Player {
  constructor(id) {
    if (global.isServer) {
      // add other player controls
    } else {
      this.control = new ControlComponent(id);
    }
  }
  setMainUnit(unit) {
    this.mainUnit = unit;
  }

  getMainUnit() {
    return this.mainUnit;
  }
}
