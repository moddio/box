import { Entity } from "./entity";
import * as BABYLON from "@babylonjs/core";

export class Unit extends Entity {
  constructor(data) {
    // run Entity's constructor
    super(data);

    this.check = 0;
    // Default radius
    this.radius = 0.2;
    this.val = 0;
    this.type = "unit";

    this.width = 5 * this.radius;
    this.height = 8 * this.radius;
    this.moveDirection; // x, y, z rotations

    this.ownerPlayer = data.ownerPlayer;

    // a player's 1st unit will automatically be assigned as the main unit
    if (this.ownerPlayer) {
      if (this.ownerPlayer.mainUnit == undefined) {
        this.ownerPlayer.mainUnit = this;
      }
    }

    if (data.body) {
      this.body = this.createBody(data.body);
    }

    this.resetPosition();

    this.body.onCollide(100);
    // this.body.boxEntity = this;
  }

  spawnBox() {
    //console.log(new BABYLON.AmmoJSPlugin());
    const scene = BOX.Engine.noa.rendering.getScene();
    //var plugin = new BABYLON.OimoJSPlugin(undefined, OIMO);

    const mesh = BOX.Mesh["CreateBox"]("Box");
    // syntatic sugar for creating a default entity
    var playPos = BOX.Engine.noa.entities.getPosition(1);
    var pos = [playPos[0], playPos[1] + 0.5, playPos[2] + 2];
    var width = 0.7;
    var height = 0.7;

    //var mesh = ballMesh.createInstance("ball_instance");
    var meshOffset = [0, 0.5, 0];
    var doPhysics = true;
    var shadow = false;

    var noaId = BOX.Engine.noa.entities.add(
      pos,
      width,
      height, // required
      mesh,
      meshOffset,
      doPhysics
    );
    this.noaEntityId = noaId;

    let body = BOX.Engine.noa.entities.getPhysicsBody(noaId);

    console.log("logging the body", body);

    scene.enablePhysics(undefined, new BABYLON.AmmoJSPlugin());
    mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
      mesh,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { ...body },
      scene
    );

    //body.restitution = 0.8;
    //console.log("logging the body of the player", body);
    /*body.friction = 10;
    body.onCollide = () => alert("body is collide");

    const direction = BOX.Engine.noa.camera.getDirection();

    // adding component for collision
    BOX.Engine.noa.entities.addComponent(
      noaId,
      BOX.Engine.noa.entities.names.collideEntities,
      {
        cylinder: true,
        callback: (otherEntsId) => BOX.collision(noaId, otherEntsId),
      }
    );*/
    /** 
    let projectile = BOX.Engine.addEntity({
      type: "Projectile",
      body: {
        offset: [0, 0.5, 0],
        type: "CreateSphere",
        unitName: "ball",
        roundShap: [6, 0.4],
        restitution: 0.8,
        friction: 0.7,
      },
    });

    

    // // adding component for collision
    // BOX.Engine.noa.entities.addComponent(
    //   noaId,
    //   BOX.Engine.noa.entities.names.collideEntities,
    //   {
    //     cylinder: true,
    //     callback: (otherEntsId) => BOX.collision(noaId, otherEntsId),
    //   }
    // );

    // var body = BOX.Engine.noa.entities.getPhysicsBody(noaId);

    const direction = BOX.Engine.noa.camera.getDirection();
    var impulse = [];
    for (let i = 0; i < 3; i++) {
      impulse[i] = 2 * direction[i];
      impulse[1] += 1;
    }
    projectile.body.applyImpulse(impulse);
    */
  }

  shootBall() {
    let projectile = BOX.Engine.addEntity({
      type: "Projectile",
      body: {
        offset: [0, 0.5, 0],
        type: "CreateSphere",
        unitName: "ball",
        roundShap: [6, 0.4],
        restitution: 0.8,
        friction: 0.7,
      },
    });

    // // adding component for collision
    // BOX.Engine.noa.entities.addComponent(
    //   noaId,
    //   BOX.Engine.noa.entities.names.collideEntities,
    //   {
    //     cylinder: true,
    //     callback: (otherEntsId) => BOX.collision(noaId, otherEntsId),
    //   }
    // );

    // var body = BOX.Engine.noa.entities.getPhysicsBody(noaId);

    const direction = BOX.Engine.noa.camera.getDirection();
    var impulse = [];
    for (let i = 0; i < 3; i++) {
      impulse[i] = 2 * direction[i];
      impulse[1] += 1;
    }
    projectile.body.applyImpulse(impulse);
  }

  getOwnerPlayer() {
    return this.ownerPlayer;
  }

  resetPosition() {
    this.body.setPosition([10, 10, 10]);
  }

  destroy() {
    super.destroy();
  }

  tick() {
    super.tick(); // call Entity.tick()

    // apply linear damping
    this.body.velocity[0] =
      this.body.velocity[0] / (1 + this.body.linearDamping);
    this.body.velocity[2] =
      this.body.velocity[2] / (1 + this.body.linearDamping);

    // Getting force value from cos sin
    let angle = BOX.Engine.noa.camera.heading;
    let force = 2;
    let y = force * Math.cos(angle);
    let x = force * Math.sin(angle);

    // Rotation
    this.mesh.rotation.y = BOX.Engine.noa.camera.heading;

    // this has to be fixed
    if (BOX.inputs.state["jump"] && Math.abs(this.body.velocity[1]) <= 0) {
      this.body.applyImpulse([0, 10, 0]);
    }
    if (BOX.inputs.state["move-left"]) {
      this.body.applyImpulse([-y, 0, x]);
    }
    if (BOX.inputs.state["move-right"]) {
      this.body.applyImpulse([y, 0, -x]);
    }
    if (BOX.inputs.state["move-up"]) {
      this.body.applyImpulse([x, 0, y]);
    }
    if (BOX.inputs.state["move-down"]) {
      this.body.applyImpulse([-x, 0, -y]);
    }
  }
}

export default Unit;
