import { Entity } from "./entity";
export class Unit extends Entity {
  constructor(data) {
    super();
    this.id = data.owner;
    // Default radius
    this.radius = 0.2;

    this.width = data.width * this.radius;
    this.height = data.height * this.radius;
    this.moveDirection = [0, 0, 0]; // x, y, z rotations
  }
  shootProjectile() {
    // creating the physics body
    const id = this.createBody({ offset: [0, 0.5, 0], type: "sphere" });
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
  tick() {
    // if this.moveDirection != [0, 0, 0], then move unit towards that direction
    this.body.applyImpulse("some values about direction and power");
  }
}

export default Unit;
