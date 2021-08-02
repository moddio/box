import Entity from "./entity";

export class Projectile extends Entity {
  constructor(playerPosition = false) {
    super();
    var ents = box.noa.entities;
    var radius = 0.2;

    if (!playerPosition) {
      var playPos = ents.getPosition(box.noa.playerEntity);
    } else {
      var playPos = playerPosition;
    }

    const ballMesh = box.Mesh.CreateSphere(
      "ball",
      6,
      2 * radius,
      noa.rendering.getScene()
    );

    var pos = [playPos[0], playPos[1] + 0.5, playPos[2]];
    var width = 2 * radius;
    var height = 2 * radius;

    var mesh = ballMesh.createInstance("ball_instance");
    var meshOffset = [0, radius, 0];
    var doPhysics = true;
    var shadow = true;
    var id = box.noa.entities.add(
      pos,
      width,
      height,
      mesh,
      meshOffset,
      doPhysics,
      shadow
    );

    // this.shootBall(id, ents);
  }
}
