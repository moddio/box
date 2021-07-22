import Unit from "../../unit";
import UnitManager from "../../unitManager";
import { socket } from "../../../src/test";

//const body = unitManager.shootBall();
// unit init
//const unit = new Unit(noa, body);
//setTimeout(() => unit.moveBall(), 10000);

class ControlManager {
  constructor(noa, player) {
    this.noa = noa;
    this.unitManager = new UnitManager(noa, player);
    this.unitManager;
    this.body;
  }
  keyPress(key, networkBall) {
    switch (key) {
      case "h":
        let arr = this.unitManager.shootBall();
        this.body = arr[0];
        //this.unit = new Unit(this.noa, this.body);
        socket.emit("ballshoot", { position: arr[1] });
    }
  }
  playerShootBall(position) {
    console.log("position", position);
    this.body = this.unitManager.shootBall(position);
    //this.unit = new Unit(this.noa, this.body);
  }
}

export default ControlManager;
