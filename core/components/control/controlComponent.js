//const body = unitManager.shootBall();
// unit init
//const unit = new Unit(noa, body);
//setTimeout(() => unit.moveBall(), 10000);

class ControlComponent {
  constructor(player) {
    this.player = player;
    //this.mainUnit = this.player.getMainUnit();
    var lastUpdate = new Date().getTime();
    window.addEventListener("keypress", (e) => {
      if (new Date().getTime() > lastUpdate + 100) {
        this.keyPress(e.key);
        lastUpdate = new Date().getTime();
      }
    });
  }

  mouseMove() {
    // if this is client and for my player, update unit's rotation upon mousemove.
  }

  keyPress(key) {
    const body = box.noa.entities.getPhysicsBody(this.player);

    // testing the control of the player
    // TODOO : TO STREAM KEY INPUT TO THE SERVER
    switch (key) {
      case "w":
        console.log("kepress", "w");
        body.applyImpulse([0, 0, 2.5]);
        break;
      case "s":
        console.log("kepress", "s");
        body.applyImpulse([0, 0, -2.5]);
        break;
      case "d":
        console.log("kepress", "d");
        body.applyImpulse([2.5, 0, 0]);
        break;
      case "a":
        console.log("kepress", "a");
        body.applyImpulse([-2.5, 0, 0]);
        break;
      case "h":
        console.log("kepress", "h");
        this.mainUnit.shootBall();
        break;
    }
  }
}

export default ControlComponent;
