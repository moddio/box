import ControlManager from "./component/control/controlManager";

class Player extends Entity {
  constructor(engine, player) {
    this.isMe = false;
    this.engine = engine;
    this.controlManager = new ControlManager(engine, player);
    this.mainUnit = this.engine.unitManager.createUnit();
  }

  getMainUnit() {
    return this.mainUnit;
  }

  playerEvent() {
    window.addEventListener("keypress", (e) => {
      this.controlManager.keyPress(e.key);
    });
  }

  playerShootBall(position) {
    this.controlManager.playerShootBall(position);
  }
}

export default Player;
