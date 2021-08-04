var inputs = require("game-inputs")();

class ControlComponent {
  constructor(player) {
    this.player = player;
    this.mouseClick();
    inputs.bind("move-up", "W", "<up>");
    inputs.bind("move-left", "A", "<left>");
    inputs.bind("move-down", "S", "<up>");
    inputs.bind("move-right", "D", "<left>");
    inputs.bind("shoot-ball", "H", "<left>");

    // movement in the scene using ticks

    var body = box.Engine.noa.entities.getPhysicsBody(this.player);
    var lastUpdate = new Date().getTime();
    box.Engine.noa.on("tick", () => {
      if (new Date().getTime() > lastUpdate + 95) {
        if (inputs.state["shoot-ball"]) {
          const unit = new box.Unit({ owner: 1, width: 7, height: 7 });
          unit.shootProjectile();
        }
        if (inputs.state["move-left"]) {
          body.applyImpulse([-5, 0, 0]);
        }
        if (inputs.state["move-right"]) {
          body.applyImpulse([5, 0, 0]);
        }
        if (inputs.state["move-up"]) {
          body.applyImpulse([0, 0, 5]);
        }
        if (inputs.state["move-down"]) {
          body.applyImpulse([0, 0, -5]);
        }
        lastUpdate = new Date().getTime();
      }

      inputs.tick();
    });
  }

  mouseMove() {
    // if this is client and for my player, update unit's rotation upon mousemove.
  }

  // Simple demo of removing blocks and adding blocks we don't want to do this here
  mouseClick() {
    box.Engine.noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        var pos = noa.targetedBlock.position;
        noa.setBlock(0, pos[0], pos[1], pos[2]);
      }
    });
    box.Engine.noa.inputs.down.on("alt-fire", function () {
      if (noa.targetedBlock) {
        var pos = noa.targetedBlock.adjacent;
        noa.addBlock(1, pos[0], pos[1], pos[2]);
      }
    });
  }

  keyPress(key) {
    switch (key) {
      case "w":
        console.log("kepress", "w");
        break;
      case "s":
        console.log("kepress", "s");
        break;
      case "d":
        console.log("kepress", "d");
        break;
      case "a":
        console.log("kepress", "a");
        break;
      case "h":
        break;
    }
  }

  keyRelease(key) {
    // testing the control of the player
    // TODOO : TO STREAM KEY INPUT TO THE SERVER
    switch (key) {
      case "w":
        console.log("kepress", "w");
        // body.applyImpulse([0, 0, 2.5]);

        // update this.mainUnit's direction
        break;
      case "s":
        console.log("kepress", "s");
        // body.applyImpulse([0, 0, -2.5]);

        // update this.mainUnit's direction
        break;
      case "d":
        console.log("kepress", "d");
        // body.applyImpulse([2.5, 0, 0]);

        // update this.mainUnit's direction
        break;
      case "a":
        console.log("kepress", "a");
        // body.applyImpulse([-2.5, 0, 0]);

        // update this.mainUnit's direction
        break;
    }
  }
}

export default ControlComponent;
