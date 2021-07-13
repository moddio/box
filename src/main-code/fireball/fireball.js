import * as BABYLON from "@babylonjs/core";

export const shootBouncyBall = (noa, player) => {
  const ents = noa.entities;
  const radius = 0.3;

  let collideHandler, removeComp, fireBallClone;

  //create a fireBall template to clone from, set it's visibility to off.
  const fireBall = BABYLON.MeshBuilder.CreateSphere("fireBall", { diameter: radius }, scene);
  const fireBallMaterial = new BABYLON.StandardMaterial("fireBallMaterial", scene);
  fireBallMaterial.diffuseColor = BABYLON.Color3.Black();
  fireBallMaterial.specularPower = 256;
  fireBall.material = fireBallMaterial;
  fireBall.visibility = false;

  if (!fireBallClone) {
    fireBallClone = fireBall.clone("fireBallClone");
    fireBallClone.visibility = 1;
    fireBallClone.position = player.absolutePosition;
  }

  // syntatic sugar for creating a default entity
  const playPos = ents.getPosition(noa.playerEntity);
  const pos = [playPos[0], playPos[1] + 0.6, playPos[2]];
  const width = radius;
  const height = radius;

  const mesh = fireBallClone.createInstance("ball_instance");
  const meshOffset = [0, radius - 0.1, 0];
  const doPhysics = true;
  const shadow = true;

  var id = noa.entities.add(
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
  const dir = noa.camera.getDirection();
  let imp = [];
  for (let i = 0; i < 3; i++) imp[i] = 5 * dir[i];
  imp[1] += 1;
  body.applyImpulse(imp);

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

  // add a custom component to remove entities if they get too far away
  if (!removeComp)
    removeComp = ents.createComponent({
      name: "remove",
      system: (dt, states) => {
        const p1 = ents.getPosition(noa.playerEntity);
        states.forEach((state) => {
          const p2 = ents.getPosition(state.__id);
          let dist = 0;
          for (let i = 0; i < 3; i++) dist += Math.abs(p1[i] - p2[i]);
          if (dist > 500) ents.deleteEntity(state.__id);
        });
      },
    });
  ents.addComponent(id, removeComp);
};
