import { inputs } from "./box";
import { Entity } from "./entity";

export class Unit extends Entity {
  constructor(data) {
    // run Entity's constructor
    super(data ? data.id : undefined);

    this.id = data.owner;
    this.check = 0;
    // Default radius
    this.radius = 0.2;
    this.val = 0;

    this.width = data.width * this.radius;
    this.height = data.height * this.radius;
    this.moveDirection; // x, y, z rotations
    inputs.down.on("shoot-ball", () => this.shootBall());

    inputs.up.on("move-left", () => {
      this.body.atRestY()
        ? this.body.applyForce([
            this.y * Math.abs(this.body.velocity[0]) * 15,
            -10,
            -this.x * Math.abs(this.body.velocity[2]) * 15,
          ])
        : "";
    });
    inputs.up.on("move-right", () => {
      this.body.atRestY() !== 0
        ? this.body.applyForce([
            -this.y * Math.abs(this.body.velocity[0]) * 15,
            -10,
            this.x * Math.abs(this.body.velocity[2]) * 15,
          ])
        : "";
    });
    inputs.up.on("move-up", () => {
      this.body.atRestY() !== 0
        ? this.body.applyForce([
            -this.x * Math.abs(this.body.velocity[0]) * 15,
            -10,
            -this.y * Math.abs(this.body.velocity[2]) * 15,
          ])
        : "";
    });
    inputs.up.on("move-down", () => {
      this.body.atRestY() !== 0
        ? this.body.applyForce([
            this.x * Math.abs(this.body.velocity[0]) * 15,
            -10,
            this.y * Math.abs(this.body.velocity[2]) * 15,
          ])
        : "";
    });

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

  resetPosition() {
    this.body.setPosition([10, 10, 10]);
  }

  tick(dt, states) {
    super.tick(); // call Entity.tick()

    // Limit player speed (Dumping)
    Math.abs(this.body.velocity[0]) > 6 || Math.abs(this.body.velocity[2]) > 6
      ? (states[0]["Dumping"] = true)
      : (states[0]["Dumping"] = false);

    // Checking if the player is not stuck
    /**
     this.body.atRestY() === 0 && Math.abs(this.body.velocity[1]) <= 0
      ? (this.body.friction = 0)
      : (this.body.friction = 2);
     */

    // Getting force value from cos sin
    let angle = box.Engine.noa.camera.heading;
    let force = Math.abs(this.body.velocity[1]) > 0 ? 0.7 : 2;
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

    // Movement Using the state of velocity and dumping the movement when the body goes very fast
    if (box.inputs.state["jump"] && Math.abs(this.body.velocity[1]) <= 0) {
      this.body.applyImpulse([0, 15, 0]);
    }
    if (box.inputs.state["move-left"] && !states[0]["Dumping"]) {
      this.body.applyImpulse([-y, 0, x]);
    }
    if (box.inputs.state["move-right"] && !states[0]["Dumping"]) {
      this.body.applyImpulse([y, 0, -x]);
    }
    if (box.inputs.state["move-up"] && !states[0]["Dumping"]) {
      this.body.applyImpulse([x, 0, y]);
    }
    if (box.inputs.state["move-down"] && !states[0]["Dumping"]) {
      this.body.applyImpulse([-x, 0, -y]);
    }

    // Using friction when only the player is not moving
    !box.inputs.state["move-left"] &&
    !box.inputs.state["move-right"] &&
    !box.inputs.state["move-up"] &&
    !box.inputs.state["move-down"] &&
    !box.inputs.state["jump"]
      ? (this.body.friction = 2)
      : (this.body.friction = 0);
    /**
  


    
 var body = box.Engine.box.Engine.noa.entities.getPhysicsBody(1);
    var lastUpdate = new Date().getTime();
    // initial position of the player
    var initialPosPlayer = [10, 10, 10];
    body.setPosition(initialPosPlayer);

    box.Engine.box.Engine.noa.on("tick", () => {
      // width height edges chaker TEMP SOLUTION
      //console.log("player position", body.getPosition());
      if (
        body.getPosition()[0] <= 0 ||
        body.getPosition()[0] >= box.edgeMap.width ||
        body.getPosition()[2] <= 0 ||
        body.getPosition()[2] >= box.edgeMap.height
      ) {
        body.setPosition([10, 10, 10]);
      }
      if (new Date().getTime() > lastUpdate + 98) {
        let current = box.Engine.box.Engine.noa.camera.heading;
        this.moveDirection = Math.round(current);
        this.mesh.rotation.y = Math.round(current);
      }
      if (new Date().getTime() > lastUpdate + 95) {
        if (inputs.state["shoot-ball"]) {
          this.owner = 1;
          this.width = 2;
          this.height = 2;
          this.shootProjectile();
        }

        let angle = box.Engine.box.Engine.noa.camera.heading;
        let force = 5;
        let y = force * Math.cos(angle);
        let x = force * Math.sin(angle);

        if (box.inputs.state["move-left"]) {
          body.applyImpulse([-y, 0, x]);
        }
        if (box.inputs.state["move-right"]) {
          body.applyImpulse([y, 0, -x]);
        }
        if (box.inputs.state["move-up"]) {
          body.applyImpulse([x, 0, y]);
        }
        if (box.inputs.state["move-down"]) {
          body.applyImpulse([-x, 0, -y]);
        }
        lastUpdate = new Date().getTime();
      }
      // this.body.applyImpulse("some values about direction and power");

      inputs.tick();
    });


     */
  }
}

export default Unit;
