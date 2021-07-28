//const body = unitManager.shootBall();
// unit init
//const unit = new Unit(noa, body);
//setTimeout(() => unit.moveBall(), 10000);

export class ControlComponent {
  constructor(player) {
    this.player = player;
    this.mainUnit = this.player.getMainUnit();

    window.addEventListener("keypress", (e) => {
      this.control.keyPress(e.key);
    });

  }

  mouseMove() {
    // if this is client and for my player, update unit's rotation upon mousemove.
    
  }

  keyPress(key) {

    // only apply control my own unit when on client side.
    if (box.isClient && this.player != box.myPlayer) {
      return;
    }

    const body = this.mainUnit.getBody()
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

      case "h":
        console.log("kepress", "h");
        this.mainUnit.shootBall();
        break;
    }
  }
}

export default ControlComponent;
