import { Entity } from "./entity";

export class Projectile extends Entity {
  constructor(data) {
    super();
    BOX.Engine.entities[this.id] = this;
    
    // Default radius
    this.radius = 0.2;

    this.width = data.width * this.radius;
    this.height = data.height * this.radius;
  }
}
