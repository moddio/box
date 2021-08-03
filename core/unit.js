import { Entity } from "./entity";
export class Unit extends Entity {
  constructor(data) {
    super();
    this.id = data.owner;
    this.moveDirection = [0, 0, 0]; // x, y, z rotations
    //this.body = box.noa.entities.getPhysicsBody(this.id);
  }
  tick() {
    // if this.moveDirection != [0, 0, 0], then move unit towards that direction
    this.body.applyImpulse("some values about direction and power");
  }
}

export default Unit;
