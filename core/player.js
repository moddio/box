import { Entity } from './entity';

export class Player extends Entity {
  constructor(data) {
    data.type = 'player';
    super(data);
    this.socketId = data.socketId; // socketId

    this.isDeveloper = true; // can this player modify this game?
    this.devToolsEnabled = false; // show/hide dev tools. only developer can do this

    //console.log("global", global.ControlComponent);

    if (BOX.isServer) {
      // if human player, add to the list of clients
      if (data.isHuman) {
        BOX.Engine.players[this.socketId] = this;
        // send the entire game's state data (all entites) to this player
        BOX.Engine.components['NetworkComponent'].broadcast('gameState', BOX.Engine.getGameState(), this.clientId);
        
        this.addComponent('ControlComponent');
      }
      // add other player controls
    } else {
      this.addComponent('ControlComponent');
      this.addComponent('DeveloperMode');
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

  createUnit() {
    let spawnRegion = BOX.Engine.getEntityByName("player_spawn");
    let spawnPosition = spawnRegion.getRandomPosition();

    this.unit = BOX.Engine.addEntity({
      type: 'Unit',
      position: spawnPosition,
      isMyUnit: true,
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

    this.addComponent('NameLabelComponent');
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
