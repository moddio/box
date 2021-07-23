import UnitManager from "../../unitManager";
import { socket } from "../../../src/client";

//const body = unitManager.shootBall();
// unit init
//const unit = new Unit(body);
//setTimeout(() => unit.moveBall(), 10000);

class ControlComponent {

  constructor(player) {
    this.player = player;
    this.body;
  }

  keyPress(key) {
    if (engine.isClient) {
      switch (key) {
        case "h":
          let unit = this.player.getMainUnit();
          unit.shootBall();
          socket.emit("keyPress", key);
      }
    } else (engine.isServer) {
      switch (key) {
        case "h":
          let unit = this.player.getMainUnit()
          unit.shootBall();
      }
    }
    
  }
}

export default ControlComponent;
