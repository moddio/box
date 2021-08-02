class ControlComponent {
  constructor(player) {
    this.player = player;
    this.mouseClick();
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

  // Simple demo of removing blocks and adding blocks we don't want to do this here
  mouseClick() {
    box.noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        var pos = noa.targetedBlock.position;
        noa.setBlock(0, pos[0], pos[1], pos[2]);
      }
    });
    box.noa.inputs.down.on("alt-fire", function () {
      if (noa.targetedBlock) {
        var pos = noa.targetedBlock.adjacent;
        noa.addBlock(1, pos[0], pos[1], pos[2]);
      }
    });
  }

  keyPress(key) {
    var { Box } = box;
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
        Box.createEntity("projectile");
        //this.mainUnit.shootBall();
        break;
    }
  }
}

export default ControlComponent;
