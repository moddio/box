import { Entity } from "./entity";

export class Item extends Entity {
  constructor(data) {
    data.type = "item";
    super(data);

    this.attachedTo = null;

    // Default radius
    this.radius = 0.2;

    this.width = data.width * this.radius;
    this.height = data.height * this.radius;
    
    if (data.streamMode == undefined) {
        this.streamMode = {
            enabled: true,
            stateChange: true,
            attributes: false,
            movement: false
        };
    }
    
    
  }

  tick() {
    super.tick();
    
    if (this.attachedTo) {
      console.log('attached');
      
      //var playPos = BOX.Engine.noa.entities.getPosition(1);
      //var pos = [playPos[0], playPos[1] + 0.5, playPos[2] + 2];
      //this.body.setPosition([playPos[0], playPos[1] + 0.5, playPos[2] + 2]);

      this.mesh.rotation = this.attachedTo.mesh.rotation;
    }

  }

}
