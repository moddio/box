import { Entity } from "./entity";
export class Unit extends Entity {
  constructor(player) {
    super();
    this.id = player;
    this.moveDirection = [0, 0, 0]; // x, y, z rotations
    //this.body = box.noa.entities.getPhysicsBody(this.id);
  }
  createBody(offset) {
    const mesh = box.Engine.Mesh.CreateBox("player-mesh", 1);
    box.Engine.noa.entities.addComponent(
      this.id,
      box.Engine.noa.entities.names.mesh,
      {
        mesh,
        offset,
      }
    );
    return mesh;
  }

  tick() {
    // if this.moveDirection != [0, 0, 0], then move unit towards that direction
    this.body.applyImpulse("some values about direction and power");
  }
}

export default Unit;
