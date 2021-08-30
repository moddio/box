import { Entity } from "./entity";

export class Player extends Entity {
  constructor(data) {
    super();
    this.name = data.name;
    this.clientId = undefined; // socketId
    this.type = "player";

    this.addComponent("ControlComponent");
    //console.log("global", global.ControlComponent);

    if (BOX.isServer) {
      // if human player, add to the list of clients
      if (data.isHuman) {
        BOX.Engine.clients[this.id] = this;
      }
      // add other player controls
    } else {
      this.addComponent("DeveloperMode");
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
    BOX.Engine.addEntity({
      type: "Unit",
      ownerPlayer: this,
      body: {
        type: "CreateBox",
        offset: [0, 0.5, 0],
        roundShap: [null, null],
        scaling: { x: 0.6, y: 1, z: 0.6 },
        linearDamping: 0.5,
        friction: 0,
      },
    });
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
