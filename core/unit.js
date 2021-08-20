import { inputs } from "./box";
import { Entity } from "./entity";

export class Unit extends Entity {
  constructor(data) {
    // run Entity's constructor
    super();

    this.check = 0;
    // Default radius
    this.radius = 0.2;
    this.val = 0;
    this.type = "unit";

    this.width = 5 * this.radius;
    this.height = 8 * this.radius;
    this.moveDirection; // x, y, z rotations

    // PUT THIS INSIDE controlComponent!!! not in unit.
    // inputs.down.on("shoot-ball", () => this.shootBall());

    this.ownerPlayer = data.ownerPlayer;

    if (this.ownerPlayer) {
      if (this.ownerPlayer.mainUnit == undefined) {
        this.ownerPlayer.mainUnit = this;
      }
    }

    // Asign the offset to the created body
    this.playerUnit();
  }

  playerUnit() {
    const mesh = this.createBody({
      offset: [0, 0.5, 0],
      type: "CreateBox",
      unitName: "player",
      roundShap: [null, null],
    });
    //BOX.Engine.Mesh.CreateBox()
    // const mesh = BOX.Engine.Mesh.CreateSphere("player-mesh", 1);
    mesh.scaling.x = 0.6;
    mesh.scaling.z = 0.6;

    console.log("myPlayer", BOX.Engine.myPlayer);

    // set ID of the entity in NOA as 1 if it's my player's main unit. otherwise we use box entity id.
    var mainUnit = undefined;
    if (BOX.Engine.myPlayer) {
      mainUnit = BOX.Engine.myPlayer.mainUnit;
    }

    if (mainUnit && mainUnit.id === this.id) {
      this.noaEntityId = 1;
    } else {
      this.noaEntityId = this.id;
    }
    //console.log("mainUnit", BOX.Engine.myPlayer.mainUnit);
    //console.log("mainUnitId", mainUnit.id, "noaEntityId", this.noaEntityId);
    // Adding mesh body in noa
    //console.log("createBody", data);

    BOX.Engine.noa.entities.addComponent(
      this.noaEntityId,
      BOX.Engine.noa.entities.names.mesh,
      {
        mesh,
        offset: [0, 0.5, 0],
      }
    );

    BOX.Engine.entities.push({
      id: this.noaEntityId,
      creationTime: false,
      lifeSpan: false,
    });

    // add entityTick
    //BOX.Engine.noa.entities.addComponent(this.noaEntityId, BOX.entityTick);

    this.mesh = mesh;
    this.body = BOX.Engine.noa.entities.getPhysicsBody(this.noaEntityId);

    this.resetPosition();

    this.body.onCollide(100);
    this.body.friction = 0;
    this.body.linearDamping = 0.5;
    // this.body.boxEntity = this;
  }

  shootBall() {
    const mesh = this.createBody({
      offset: [0, 0.5, 0],
      type: "CreateSphere",
      unitName: "ball",
      roundShap: [6, 0.4],
    });
    // syntatic sugar for creating a default entity
    var playPos = BOX.Engine.noa.entities.getPosition(1);
    var pos = [playPos[0], playPos[1] + 0.5, playPos[2] + 2];
    var width = 0.7;
    var height = 0.7;

    //var mesh = ballMesh.createInstance("ball_instance");
    var meshOffset = [0, 0.2, 0];
    var doPhysics = true;
    var shadow = true;

    var id = BOX.Engine.noa.entities.add(
      pos,
      width,
      height, // required
      mesh,
      meshOffset,
      doPhysics
    );
    BOX.Engine.entities.push({
      id,
      creationTime: BOX.Engine.engineTime,
      lifeSpan: 10000 + BOX.Engine.engineTime,
    });
    var body = BOX.Engine.noa.entities.getPhysicsBody(id);

    body.restitution = 0.8;
    body.friction = 0.7;

    const direction = BOX.Engine.noa.camera.getDirection();
    var impulse = [];
    for (let i = 0; i < 3; i++) {
      impulse[i] = 2 * direction[i];
      impulse[1] += 1;
    }
    body.applyImpulse(impulse);

    // adding component for collision
    BOX.Engine.noa.entities.addComponent(
      id,
      BOX.Engine.noa.entities.names.collideEntities,
      {
        cylinder: true,
        callback: (otherEntsId) => BOX.collision(id, otherEntsId),
      }
    );
  }

  getOwnerPlayer() {
    return this.ownerPlayer;
  }

  resetPosition() {
    this.body.setPosition([10, 10, 10]);
  }

  tick() {
    super.tick(); // call Entity.tick()

    // Checking if the player is not stuck
    /**
     this.body.atRestY() === 0 && Math.abs(this.body.velocity[1]) <= 0
      ? (this.body.friction = 0)
      : (this.body.friction = 2);
     */
  }
}

export default Unit;
