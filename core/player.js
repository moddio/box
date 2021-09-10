const { Entity } = require('./entity');

class Player extends Entity {
  constructor(data) {
    super(data);
    data.type = 'Player';
    this.clientId = data.socketId;

    this.isDeveloper = true; // can this player modify this game?
    this.devToolsEnabled = false; // show/hide dev tools. only developer can do this

    if (BOX.isServer) {
      // if human player, add to the list of clients
      if (data.isHuman) {
        BOX.Engine.clients[this.id] = this;
        // send the entire game's state data (all entites) to this player
        //BOX.Engine.components['NetworkComponent'].broadcast('gameState', BOX.Engine.getGameState(), this.clientId);

        //this.addComponent('ControlComponent');
        //this.addComponent('NetworkComponent');
      }
      // add other player controls
    } else {
      if (BOX.isClient) {
        this.addComponent('ControlComponent');
      }
      if (BOX.isClient) {
        this.addComponent('DeveloperMode');
      }
    }

    if (data.streamMode == undefined) {
      this.streamMode = {
        enabled: true,
        stateChange: true,
        attributes: true,
        movement: false,
        csp: false // client-side prediction. if enabled, the unit/item's owner player will ignore the streaming he has received for his own unit/item.
      };
    }
  }

  createUnit(data) {
    this.unit = BOX.Engine.addEntity(data);
    this.noaEntityId = this.unit.noaEntityId;
    BOX.isClient ? this.addComponent('NameLabelComponent') : '';
    return this.unit;
  }

  destroy() {
    delete BOX.Engine.clients[this.id];
    super.destroy();
  }

  tick() {
    super.tick(); // call Entity.tick()
    // console.log("this is running now");
  }
}

module.exports = { Player };
