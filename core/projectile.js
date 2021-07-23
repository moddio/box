class Projectile extends Entity {
  constructor(playerPosition = false) {
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

    var id = engine.noa.entities.add(
      pos,
      width,
      height, // required
      mesh,
      meshOffset,
      doPhysics,
      shadow // optional
    );

    return id;
  }
}
