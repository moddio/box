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

    this.width = 5 * this.radius;
    this.height = 8 * this.radius;
    this.moveDirection; // x, y, z rotations

    // PUT THIS INSIDE controlComponent!!! not in unit.
    // inputs.down.on("shoot-ball", () => this.shootBall());

    // Asign the offset to the created body
    this.createBody({ offset: [0, 0.5, 0], type: "mesh" });
    this.resetPosition();
  }

  shootBall() {
    /**
      const { body, id } = this.createBody({
      offset: [0, 0.5, 0],
      type: "sphere",
    });
    this.lifeSpend(id, 10000);

    body.restitution = 0.8;
    body.friction = 0.7;

    const direction = box.Engine.noa.camera.getDirection();
    var impulse = [];
    for (let i = 0; i < 3; i++) {
      impulse[i] = 5 * direction[i];
      impulse[1] += 1;
    }
    body.applyImpulse(impulse);

    // adding component for collision (Fake physics)
    box.Engine.noa.entities.addComponent(
      id,
      box.Engine.noa.entities.names.collideEntities,
      {
        cylinder: true,
        callback: (otherEntsId) => box.collision(id, otherEntsId),
      }
    );
     */
  }

  getOwnerPlayer() {
    return this.ownerPlayer;
  }

  resetPosition() {
    this.body.setPosition([10, 10, 10]);
  }

  tick(dt, states) {
    super.tick(); // call Entity.tick()

    // Checking if the player is not stuck
    /**
     this.body.atRestY() === 0 && Math.abs(this.body.velocity[1]) <= 0
      ? (this.body.friction = 0)
      : (this.body.friction = 2);
     */

    // Getting force value from cos sin
    let angle = box.Engine.noa.camera.heading;
    let force = 2;
    let y = force * Math.cos(angle);
    let x = force * Math.sin(angle);

    this.y = y;
    this.x = x;

    // Increase gravity when the player is against the floor for now until we figure out why the entity player is stuck on jump
    states[0]["stuck"]
      ? (this.body.gravityMultiplier = 32)
      : (this.body.gravityMultiplier = 2);

    // Rotation
    let current = box.Engine.noa.camera.heading;
    this.mesh.rotation.y = current;

    // console.log("logging the velocity state", this.body.velocity);

    // this has to be fixed
    if (box.inputs.state["jump"] && Math.abs(this.body.velocity[1]) <= 0) {
      this.body.applyImpulse([0, 10, 0]);
    }

    if (box.inputs.state["move-left"]) {
      this.body.applyImpulse([-y, 0, x]);
    }
    if (box.inputs.state["move-right"]) {
      this.body.applyImpulse([y, 0, -x]);
    }
    if (box.inputs.state["move-up"]) {
      this.body.applyImpulse([x, 0, y]);
    }
    if (box.inputs.state["move-down"]) {
      this.body.applyImpulse([-x, 0, -y]);
    }
  }
}

export default Unit;
