import { Entity } from "./entity";

export class Projectile extends Entity {
  constructor(data) {
    super();
    // Default radius
    this.radius = 0.2;

    this.width = data.width * this.radius;
    this.height = data.height * this.radius;

    
    if (data.body) {
      this.body = this.createBody(data.body);
    }
    
  }
}
