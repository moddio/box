export class Unit extends Entity {
  constructor() {}

  shootBall(playerPosition = false) {
    const ents = engine.noa.entities;
    const radius = 0.3;
    // syntatic sugar for creating a default entity
    if (!playerPosition) {
      var playPos = ents.getPosition(engine.noa.playerEntity);
    } else {
      var playPos = playerPosition;
    }
    const pos = [playPos[0], playPos[1] + 0.6, playPos[2]];
    const width = radius;
    const height = radius;

    const mesh = fireBallClone.createInstance("ball_instance");
    const meshOffset = [0, radius - 0.1, 0];
    const doPhysics = true;
    const shadow = true;

    let params = [
      pos,
      width,
      height, // required
      mesh,
      meshOffset,
      doPhysics,
      shadow, // optional
    ];

    let ball = new Projectile();
    ball.createBody(...params);
    const id = ball.Ball(playerPosition);

    // adjust physics body
    const body = ents.getPhysicsBody(id);
    body.restitution = 0.8;
    body.friction = 0.6;
    body.mass = 0.5;
    const dir = engine.noa.camera.getDirection();
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
    return [body, ents.getPosition(engine.noa.playerEntity)];
  }
}

export default Unit;
