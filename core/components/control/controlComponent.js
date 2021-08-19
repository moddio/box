import { savingMap } from "../map/tiledLoader";

class ControlComponent {
  constructor(player) {
    this.player = player;
    this.mouseClick();
    window.addEventListener("keypress", (e) => {
      this.keyPress(e.key);
    });
  }

  mouseMove() {
    // if this is client and for my player, update unit's rotation upon mousemove.
  }

  // Simple demo of removing blocks and adding blocks we don't want to do this here
  mouseClick() {}

  keyPress(key) {
    var materialType = 1;
    // BOX.inputs.state["move-left"])
    switch (key) {
      // shoot the ball
      case "b":
        let unit = BOX.Engine.myPlayer.mainUnit;
        if (unit) {
          unit.shootBall();
        }
        break;
      case "c":
        materialType === 1 ? (materialType = 2) : (materialType = 1);
        break;
      case "l":
        // add block
        if (BOX.Engine.noa.targetedBlock) {
          var pos = BOX.Engine.noa.targetedBlock.position;

          if (
            pos[0] <= 0 ||
            pos[0] >= 20 ||
            pos[1] <= 0 ||
            pos[1] >= 20 ||
            pos[2] <= 0 ||
            pos[2] >= 20
          ) {
            ("");
          } else {
            BOX.Engine.noa.setBlock(0, pos[0], pos[1], pos[2]);
            savingMap.saveBlock(pos[0], pos[1], pos[2], 0);
          }
        }
        break;
      case "k":
        // remove block
        if (BOX.Engine.noa.targetedBlock) {
          var pos = BOX.Engine.noa.targetedBlock.adjacent;
          BOX.Engine.noa.addBlock(materialType, pos[0], pos[1], pos[2]);
          savingMap.saveBlock(pos[0], pos[1], pos[2], materialType);
        }
        break;

      // change the material type
    }
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
