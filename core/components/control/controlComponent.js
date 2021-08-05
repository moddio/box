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

  keyPress() {
    let materialType = 1;
    window.addEventListener("keypress", () => {
      if (box.inputs.state["change-material"]) {
        materialType === 1 ? (materialType = 2) : (materialType = 1);
      }

      if (box.inputs.state["add-block"]) {
        if (box.Engine.noa.targetedBlock) {
          var pos = box.Engine.noa.targetedBlock.position;
          box.Engine.noa.setBlock(0, pos[0], pos[1], pos[2]);
        }
      }

      if (box.inputs.state["remove-block"]) {
        if (box.Engine.noa.targetedBlock) {
          var pos = box.Engine.noa.targetedBlock.adjacent;
          box.Engine.noa.addBlock(materialType, pos[0], pos[1], pos[2]);
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
