import ControlManager from "./component/control/controlManager";

class Player {
  constructor(noa, player) {
    this.controlManager = new ControlManager(noa, player);
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
