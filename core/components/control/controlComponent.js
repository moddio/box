class ControlComponent {
  constructor(player) {
    this.player = player;
    this.mouseClick();
    this.keyPress();
  }

  mouseMove() {
    // if this is client and for my player, update unit's rotation upon mousemove.
  }

  // Simple demo of removing blocks and adding blocks we don't want to do this here
  mouseClick() {}

  keyPress(key) {

    switch (key) {
      case "b":
        let unit = this.player.mainUnit;
        if (unit) {
          unit.shootBall();
        }
        break;
    }

    let materialType = 1;
    window.addEventListener("keypress", () => {
      if (BOX.inputs.state["change-material"]) {
        materialType === 1 ? (materialType = 2) : (materialType = 1);
      }

      if (BOX.inputs.state["add-block"]) {
        if (BOX.Engine.noa.targetedBlock) {
          var pos = BOX.Engine.noa.targetedBlock.position;

          pos[0] <= 0 ||
          pos[0] >= 20 ||
          pos[1] <= 0 ||
          pos[1] >= 20 ||
          pos[2] <= 0 ||
          pos[2] >= 20
            ? ""
            : BOX.Engine.noa.setBlock(0, pos[0], pos[1], pos[2]);
        }
      }

      if (BOX.inputs.state["remove-block"]) {
        if (BOX.Engine.noa.targetedBlock) {
          var pos = BOX.Engine.noa.targetedBlock.adjacent;
          BOX.Engine.noa.addBlock(materialType, pos[0], pos[1], pos[2]);
        }
      }
    });
  }

  keyRelease(key) {
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
    }
  }
}

export default ControlComponent;
