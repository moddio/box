class ControlComponent {
  constructor(player) {
    this.player = player;
    this.mouseClick();
    this.mainUnit = this.player.getMainUnit();
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
    
    // testing the control of the player
    // TODOO : TO STREAM KEY INPUT TO THE SERVER
    switch (key) {
      case "w":
        console.log("kepress", "w");        
        // body.applyImpulse([0, 0, 2.5]);

        // update this.mainUnit's direction. you may need to use SIN/COS
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
      case "h":
        console.log("kepress", "h");
        var projectile = new box.Projectile({
                                    position: this.player.position,
                                    width: 5,
                                    height: 5
                                  });
        projectile.applyImpulse("blahblah")
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
