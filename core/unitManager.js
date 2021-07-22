import * as BABYLON from "@babylonjs/core";
class UnitManager {
  constructor(engine, player) {
    this.engine = engine;
    this.player = player;
  }

  createUnit() {
    let unit = new Unit();
    return unit;
  }

  shootBall(playerPosition = false) {
    const ents = this.noa.entities;
    const radius = 0.3;

    let collideHandler, removeComp, fireBallClone;

    //create a fireBall template to clone from, set it's visibility to off.
    const fireBall = BABYLON.MeshBuilder.CreateSphere(
      "fireBall",
      { diameter: radius },
      scene
    );
    const fireBallMaterial = new BABYLON.StandardMaterial(
      "fireBallMaterial",
      scene
    );
    fireBallMaterial.diffuseColor = BABYLON.Color3.Black();
    fireBallMaterial.specularPower = 256;
    fireBall.material = fireBallMaterial;
    fireBall.visibility = false;

    if (!fireBallClone) {
      fireBallClone = fireBall.clone("fireBallClone");
      fireBallClone.visibility = 1;
      fireBallClone.position = this.player.absolutePosition;
      console.log("playerPosition", this.player.absolutePosition);
    }

    // syntatic sugar for creating a default entity
    if (!playerPosition) {
      var playPos = ents.getPosition(this.noa.playerEntity);
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

    var id = this.noa.entities.add(
      pos,
      width,
      height, // required
      mesh,
      meshOffset,
      doPhysics,
      shadow // optional
    );

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
