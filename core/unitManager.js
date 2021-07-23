import { Unit } from "./unit";

class UnitManager {
  constructor(noa, player) {
    this.noa = noa;
    this.player = player;
  }
  shootBall(playerPosition = false, noa) {
    this.ballUnit = new Unit(noa);
    const id = this.ballUnit.Ball(playerPosition);

    // adjust physics body
    const body = ents.getPhysicsBody(id);
    body.restitution = 0.8;
    body.friction = 0.6;
    body.mass = 0.5;
    const dir = this.noa.camera.getDirection();
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
    return [body, ents.getPosition(this.noa.playerEntity)];
  }
}

export default UnitManager;
