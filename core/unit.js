import { Projectile } from "./projectile";

const projectile = new Projectile();

export class Unit {
  constructor() {
    this.engine = global.engine;
    this.bodyID = projectile.id;
  }
  shootBall() {
    // adjust physics body
    const body = ents.getPhysicsBody(this.bodyID);
    body.restitution = 0.8;
    body.friction = 0.6;
    body.mass = 0.5;
    const dir = this.engine.noa.camera.getDirection();
    let imp = [];
    for (let i = 0; i < 3; i++) imp[i] = 5 * dir[i];
    imp[1] += 1;
    body.applyImpulse(imp);
    console.log("body", { ...body });

    if (!collideHandler)
      collideHandler = (id, other) => {
        const p1 = ents.getPosition(id);
        const p2 = ents.getPosition(other);

        let imp = [];
        for (let i = 0; i < 3; i++) imp[i] = 3 * (p1[i] - p2[i]);
        const b = ents.getPhysicsBody(id);
        b.applyImpulse(imp);
      };

    ents.addComponent(id, ents.names.collideEntities, {
      cylinder: true,
      callback: (other) => collideHandler(id, other),
    });
    return [body, ents.getPosition(this.engine.noa.playerEntity)];
  }
}

export default Unit;
