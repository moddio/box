export class Projectile {
  constructor() {}
  shootBall() {
    var ents = box.Engine.noa.entities;
    var radius = 0.2;
    var playPos = ents.getPosition(box.Engine.noa.playerEntity);

    const ballMesh = box.Engine.Mesh.CreateSphere(
      "ball",
      6,
      2 * radius,
      box.Engine.noa.rendering.getScene()
    );

    var pos = [playPos[0], playPos[1] + 0.5, playPos[2]];
    var width = 2 * radius;
    var height = 2 * radius;

    var mesh = ballMesh.createInstance("ball_instance");
    var meshOffset = [0, radius, 0];
    var doPhysics = true;
    var shadow = true;
    var id = box.Engine.noa.entities.add(
      pos,
      width,
      height,
      mesh,
      meshOffset,
      doPhysics,
      shadow
    );
    const body = ents.getPhysicsBody(id);
    body.restitution = 0.8;
    body.friction = 0.6;
    body.mass = 0.5;
    const dir = box.Engine.noa.camera.getDirection();
    let imp = [];
    for (let i = 0; i < 3; i++) imp[i] = 5 * dir[i];
    imp[1] += 1;
    body.applyImpulse(imp);
    console.log("body", { ...body });
    return [body, ents.getPosition(box.Engine.noa.playerEntity)];
  }
}
