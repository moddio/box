import { savingMap } from "../map/tiledLoader"; // <- get rid of this
import { Component } from "../component";

class ControlComponent extends Component {
  constructor() {
    super();
    console.log("test", this.parent);

    BOX.inputs.bind("move-up", "W", "<up>");
    BOX.inputs.bind("move-left", "A", "<left>");
    BOX.inputs.bind("move-down", "S", "<up>");
    BOX.inputs.bind("move-right", "D", "<left>");
    BOX.inputs.bind("jump", "<space>");
    BOX.inputs.bind("change-material", "P", "<left>");
    BOX.inputs.bind("add-block", "L", "<left>");
    BOX.inputs.bind("remove-block", "K", "<left>");

    //this.player = player;
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
    if (
      BOX.Engine.noa.container.hasPointerLock &&
      this.parent &&
      this.parent.isDeveloper
    ) {
      // let devComponentExists = this.parent.hasComponent("DeveloperComponent");
      let devComponent = this.parent.components["DeveloperComponent"];
      if (devComponent) {
        switch (button) {
          case 0:
            // add block
            if (BOX.Engine.noa.targetedBlock) {
              // devComponent.magic()

              var pos = BOX.Engine.noa.targetedBlock.adjacent;
              BOX.Engine.noa.addBlock(
                this.materialType,
                pos[0],
                pos[1],
                pos[2]
              );
              savingMap.saveBlock(pos[0], pos[1], pos[2], this.materialType);
            }

            break;
          case 2:
            // remove block
            if (BOX.Engine.noa.targetedBlock) {
              var pos = BOX.Engine.noa.targetedBlock.position;
              //check if target block is invisible material
              if (BOX.Engine.noa.targetedBlock.blockID === 1000) {
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
  }

  keyPress(key) {
    // BOX.inputs.state["move-left"])
    let unit = BOX.Engine.myPlayer.mainUnit;
    switch (key) {
      // shoot the ball
      case "b":
        //let unit = BOX.Engine.myPlayer.mainUnit;
        if (unit) {
          unit.shootBall();
          //unit.showCrosshair();
        }
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
