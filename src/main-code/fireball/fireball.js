import * as BABYLON from "@babylonjs/core";

export const shootBouncyBall = (noa, player) => {
  const ents = noa.entities;
  const radius = 0.05;

  let collideHandler, removeComp, fireBallClone;

  //create a fireBall template to clone from, set it's visibility to off.
  const fireBall = BABYLON.MeshBuilder.CreateSphere("fireBall", { diameter: 0.2 }, scene);
  const fireBallMaterial = new BABYLON.StandardMaterial("fireBallMaterial", scene);
  fireBallMaterial.diffuseColor = BABYLON.Color3.Black();
  fireBallMaterial.specularPower = 256;
  fireBall.material = fireBallMaterial;
  fireBall.visibility = false;

  if (!fireBallClone) {
    fireBallClone = fireBall.clone("fireBallClone");
    fireBallClone.visibility = 1;
    fireBallClone.position = player.absolutePosition;
    fireBallClone.physicsImpostor = new BABYLON.PhysicsImpostor(
      fireBallClone,
      BABYLON.PhysicsImpostor.SphereImpostor,
      { mass: 2, friction: 0.5, restitution: 0 },
      scene
    );
    fireBallClone.physicsImpostor.applyImpulse(player.up.scale(40), BABYLON.Vector3.Zero());
  }

  // syntatic sugar for creating a default entity
  const playPos = ents.getPosition(noa.playerEntity);
  const pos = [playPos[0], playPos[1] + 0.5, playPos[2]];
  const width = 1 * radius;
  const height = 1 * radius;

  const mesh = fireBallClone.createInstance("ball_instance");
  const meshOffset = [0, radius, 0];
  // const doPhysics = true;
  const shadow = true;

  var id = noa.entities.add(
    pos,
    width,
    height, // required
    mesh,
    meshOffset,
    shadow // optional
  );

  // adjust physics body
  const body = ents.getPhysicsBody(id);
  body.restitution = 0.8;
  body.friction = 0.7;
  const dir = noa.camera.getDirection();
  let imp = [];
  for (let i = 0; i < 3; i++) imp[i] = 5 * dir[i];
  imp[1] += 1;
  body.applyImpulse(imp);

  // add an entity collision handler, doing fake pseudo physics
  // (physics engine only does entity-terrain collisions, not entity-entity)
  if (!collideHandler)
    collideHandler = (id, other) => {
      const p1 = ents.getPosition(id);
      const p2 = ents.getPosition(other);
      let imp = [];
      for (let i = 0; i < 3; i++) imp[i] = 2 * (p1[i] - p2[i]);
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

/**
 * // shoot a bouncy ball (1)
noa.inputs.bind('shoot', '1')
var shoot = () => shootBouncyBall(noa)
var interval, timeout
noa.inputs.down.on('shoot', function () {
    shoot()
    timeout = setTimeout(() => {
        interval = setInterval(shoot, 50)
    }, 400)
})
noa.inputs.up.on('shoot', function () {
    clearTimeout(timeout)
    clearInterval(interval)
})

 */
