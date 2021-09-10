const { Entity } = require('./entity');

class Player extends Entity {
  constructor(data) {
    super(data);
    data.type = 'Player';
    this.socketID = data.socketID;

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
      if (BOX.isClient && data.socketID === BOX.socket.id) {
        console.log('3333333333333333 ADDING CONTROL COMPONENT')
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

  createUnit(spawnPosition) {
    this.unit = BOX.Engine.addEntity({
      type: 'Unit',
      position: spawnPosition,
      ownerPlayer: this,
      doPhysics: true,
      body: {
        type: 'CreateBox',
        offset: [0, 0.5, 0],
        radius: 0.2,
        width: 5,
        height: 8,
        roundShap: [null, null],
        scaling: { x: 0.6, y: 1, z: 0.6 },
        linearDamping: 0.5,
        friction: 0
      }
    });

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
