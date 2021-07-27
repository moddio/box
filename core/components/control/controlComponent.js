//const body = unitManager.shootBall();
// unit init
//const unit = new Unit(noa, body);
//setTimeout(() => unit.moveBall(), 10000);

export class ControlComponent {
  constructor(playerID, noa) {
    this.playerID = playerID;
    this.noa = noa;
  }

  mouseMove() {
    // if this is client and for my player, update unit's rotation upon mousemove.
    this.player.getMainUnit();
  }

  keyPress(key) {
    const body = this.noa.entities.getPhysicsBody(this.playerID);
    // testing the control of the player
    // TODOO : TO STREAM KEY INPUT TO THE SERVER
    switch (key) {
      case "w":
        console.log("kepress", "w");
        body.applyImpulse([0, 0, 5]);
        break;
      case "s":
        console.log("kepress", "s");
        body.applyImpulse([0, 0, -5]);
        break;
      case "d":
        console.log("kepress", "d");
        body.applyImpulse([5, 0, 0]);
        break;
      case "a":
        console.log("kepress", "a");
        body.applyImpulse([-5, 0, 0]);
        break;
    }
  }
}

export default ControlComponent;
