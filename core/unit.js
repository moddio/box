import { Entity } from "./entity";
export class Unit extends Entity {
  constructor() {
    super();
  }
  createBody(id, offset) {
    const mesh = box.Mesh.CreateBox("player-mesh", 1);
    box.noa.entities.addComponent(id, box.noa.entities.names.mesh, {
      mesh,
      offset,
    });
    return mesh;
  }
  shootBall(id, ents) {
    const body = ents.getPhysicsBody(id);
    body.restitution = 0.8;
    body.friction = 0.6;
    body.mass = 0.5;
    const dir = box.noa.camera.getDirection();
    let imp = [];
    for (let i = 0; i < 3; i++) imp[i] = 5 * dir[i];
    imp[1] += 1;
    body.applyImpulse(imp);
    console.log("body", { ...body });
    return [body, ents.getPosition(box.noa.playerEntity)];
  }
}

export default Unit;
