import { savingMap } from "../map/tiledLoader";

class ControlComponent {
  constructor(player) {
    BOX.inputs.bind("move-up", "W", "<up>");
    BOX.inputs.bind("move-left", "A", "<left>");
    BOX.inputs.bind("move-down", "S", "<up>");
    BOX.inputs.bind("move-right", "D", "<left>");
    BOX.inputs.bind("jump", "<space>");
    BOX.inputs.bind("change-material", "P", "<left>");
    BOX.inputs.bind("add-block", "<mouse 1>");
    BOX.inputs.bind("remove-block", "K", "<left>");

    this.player = player;
    this.materialType = 1;
    //this.mouseClick();

    window.addEventListener("keypress", (e) => {
      this.keyPress(e.key);
    });
    window.addEventListener("click", (e) => {
      this.mouseClick(e.button);
    });
    
  }

  mouseMove() {
    // if this is client and for my player, update unit's rotation upon mousemove.
  }

  // Simple demo of removing blocks and adding blocks we don't want to do this here
  mouseClick(button) {
    //check if mouse pointer is locked
    if (BOX.Engine.noa.container.hasPointerLock) {
    switch (button) {
      case 0:
        // add block
        if (BOX.Engine.noa.targetedBlock) {
          var pos = BOX.Engine.noa.targetedBlock.adjacent;
          BOX.Engine.noa.addBlock(this.materialType, pos[0], pos[1], pos[2]);
          savingMap.saveBlock(pos[0], pos[1], pos[2], this.materialType);
        }
        
        break;
      case 2:
        // remove block
        if (BOX.Engine.noa.targetedBlock) {
          var pos = BOX.Engine.noa.targetedBlock.position;

          // add comment here~!
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
      }
    }
  }

  keyPress(key) {
    // BOX.inputs.state["move-left"])
    switch (key) {
      // shoot the ball
      case "b":
        let unit = BOX.Engine.myPlayer.mainUnit;
        if (unit) {
          unit.shootBall();
        }
        break;

        // change the material type - if we need it? we can change material in developer mode, may be improve this some way?
      case "c":
        this.materialType === 1 ? (this.materialType = 2) : (this.materialType = 1);
        break;

      
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
