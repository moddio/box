import { Component } from '../component';

class ControlComponent extends Component {
  constructor(parent) {
    super(parent);

    BOX.inputs.bind('move-up', 'W', '<up>');
    BOX.inputs.bind('move-left', 'A', '<left>');
    BOX.inputs.bind('move-down', 'S', '<up>');
    BOX.inputs.bind('move-right', 'D', '<left>');
    BOX.inputs.bind('jump', '<space>');
    BOX.inputs.bind('change-material', 'P', '<left>');
    BOX.inputs.bind('add-block', 'L', '<left>');
    BOX.inputs.bind('remove-block', 'K', '<left>');

    //this.player = player;
    //this.mouseClick();

    window.addEventListener('keypress', e => {
      this.keyPress(e.key);
    });
    window.addEventListener('click', e => {
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
      if (this.parent && this.parent.isDeveloper) {
        let devComponent = this.parent.components['DeveloperMode']; //need to fix this !!!
        if (devComponent && devComponent.status) {
          switch (button) {
            case 0:
              // add block
              if (BOX.Engine.noa.targetedBlock) {
                devComponent.addBlock();
              }
              break;
            case 2:
              // remove block
              if (BOX.Engine.noa.targetedBlock) {
                devComponent.removeBlock();
              }
              break;
          }
        }
      }
    }
  }

  keyPress(key) {
    // BOX.inputs.state["move-left"])
    let unit = this.parent.mainUnit;
    if (unit) {
      switch (key) {
        // shoot the ball
        case 'b':
          if (unit) {
            //unit.shootBall();
            unit.createItem();
          }
          break;
          case 'n':
          if (unit) {
            //unit.shootBall();
            unit.unattachItem();
          }
          break;
      }
    }
  }

  keyRelease(key) {
    switch (key) {
      case 'w':
        console.log('kepress', 'w');
        break;
      case 's':
        console.log('kepress', 's');
        break;
      case 'd':
        console.log('kepress', 'd');
        break;
      case 'a':
        console.log('kepress', 'a');
        break;
    }
  }
}

export default ControlComponent;
