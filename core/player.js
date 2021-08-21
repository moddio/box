import { Entity } from "./entity";

export class Player extends Entity {
  constructor(data) {
    super();
    this.name = data.name;
    this.clientId = undefined; // socketId
    this.type = 'player';

    //console.log("global", global.ControlComponent);
    if (BOX.isServer) {
      // add other player controls
    } else {
      this.addComponent("ControlComponent");
      this.addComponent("DeveloperMode");
    }   
  }
  
  createUnit() {
    BOX.Engine.addEntity({
                    type:'Unit', 
                    ownerPlayer: this, 
                    body: {
                      type: "CreateBox",
                      offset: [0, 0.5, 0],
                      roundShap: [null, null],
                      scaling: {x: 0.6, y: 1, z: 0.6},
                      linearDamping: 0.5,
                      friction: 0
                    }
                })
  }

  tick() {
    super.tick(); // call Entity.tick()
    console.log("this isn't running")
  }
}
