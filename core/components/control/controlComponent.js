const { Component } = require('../component');

class ControlComponent extends Component {
  constructor(parent) {
    super(parent);

    if (BOX.isClient) {
      BOX.inputs.bind('move-up', 'W', '<up>');
      BOX.inputs.bind('move-left', 'A', '<left>');
      BOX.inputs.bind('move-down', 'S', '<up>');
      BOX.inputs.bind('move-right', 'D', '<left>');
      BOX.inputs.bind('jump', '<space>');
      BOX.inputs.bind('change-material', 'P', '<left>');
      BOX.inputs.bind('add-block', 'L', '<left>');
      BOX.inputs.bind('remove-block', 'K', '<left>');

      //var scene = BOX.Engine.noa.rendering.getScene();
      this.debug = false;

      //this.player = player;
      //this.mouseClick();

      window.addEventListener('keypress', e => {
        this.keyPress(e.key);
      });
      window.addEventListener('click', e => {
        this.mouseClick(e.button);
      });
    }
  }

  mouseMove() {
    // if this is client and for my player, update unit's rotation upon mousemove.
  }

  // Simple demo of removing blocks and adding blocks we don't want to do this here
  mouseClick(button) {
    //check if mouse pointer is locked
    /*if (BOX.Engine.noa.container.hasPointerLock) {
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
    }*/
  }

  keyPress(key) {
    // BOX.inputs.state["move-left"])
    let unit = this.parent.mainUnit;
    if (unit) {
      switch (key) {
        // shoot the ball
        case 't':
          BOX.socket.emit('keyPress', { key: 't', unit: unit.id });
          break;
        case 'b':
          if (unit) {
            unit.shootBall();
            BOX.socket.emit('new-unit', { owner: unit.ownerPlayer.name, position: unit.data.position, type: 'ball' });
            console.log('this is the unit', unit);
            //unit.createItem();
          }
          break;
        case 'n':
          if (unit) {
            //unit.shootBall();
            unit.unequipItem();
            BOX.socket.emit('new-unit', { owner: unit.ownerPlayer.name, position: unit.data.position, type: 'item' });
            console.log('this is the unit', unit.ownerPlayer.name);
          }
          break;
        case 'v':
          // dynamic import because the library is very heavy
          import('@babylonjs/inspector').then(data => {
            console.log('show the debug layer', scene.debugLayer);
            this.debug = !this.debug;
            //embedMode: true
            if (this.debug) scene.debugLayer.show();
            else scene.debugLayer.hide();
          });
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
      case 'v':
        console.log('kepress', 'd');
        break;
      case 'a':
        console.log('kepress', 'a');
        break;
    }
  }
}

module.exports = ControlComponent;
