import { Entity } from "./entity";

export class Item extends Entity {
  constructor(data) {
    data.type = "item";
    super(data);

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
}
