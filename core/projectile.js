export class Projectile {
  constructor(data) {
    // Default radius
    this.radius = 0.2;

    this.width = data.width * this.radius;
    this.height = data.height * this.radius;
  }
  shootBall() {
    var ents = box.Engine.noa.entities;
    var playPos = ents.getPosition(box.Engine.noa.playerEntity);

    const ballMesh = box.Engine.Mesh.CreateSphere(
      "ball",
      6,
      this.height * this.radius,
      box.Engine.noa.rendering.getScene()
    );

    var pos = [playPos[0], playPos[1] + 0.5, playPos[2]];

    var mesh = ballMesh.createInstance("ball_instance");
    var meshOffset = [0, this.radius, 0];
    var doPhysics = true;
    var shadow = true;
    var id = box.Engine.noa.entities.add(
      pos,
      this.width,
      this.height,
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
