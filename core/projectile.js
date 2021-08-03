import { Entity } from "./entity";

export class Projectile extends Entity {
  constructor(data) {
    super();
    // Default radius
    this.radius = 0.2;

    this.width = data.width * this.radius;
    this.height = data.height * this.radius;
  }
  shootProjectile() {
    // creating the physics body
    const id = this.createBody(null, { type: "sphere" });
    const body = this.ents.getPhysicsBody(id);

    // adding params to applyImpulse based on camera direction
    body.restitution = 0.8;
    body.friction = 0.6;
    body.mass = 0.5;
    const dir = box.Engine.noa.camera.getDirection();
    let imp = [];
    for (let i = 0; i < 3; i++) imp[i] = 5 * dir[i];
    imp[1] += 1;
    body.applyImpulse(imp);
  }
}
