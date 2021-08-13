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

    // Asign the offset to the created body
    this.createBody({ offset: [0, 0.5, 0], type: "mesh" });
    this.resetPosition();
  }
  shootBall() {
    const { body, id } = this.createBody({
      offset: [0, 0.5, 0],
      type: "sphere",
    });

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

    let angle = box.Engine.noa.camera.heading;
    let force = Math.abs(this.body.velocity[1]) > 0 ? 0.6 : 2;
    let y = force * Math.cos(angle);
    let x = force * Math.sin(angle);

    //console.log(this.body.atRestY());

    //this.body.atRestY() === 0 ? this.check++ : (this.check = 0);

    console.log(this.body);

    //this.body.friction = 10;
    //this.body.gravityMultiplier = 10000;

    // Rotation
    let current = box.Engine.noa.camera.heading;
    this.mesh.rotation.y = current;
    // Logging friction
    //console.log(this.body.friction);

    // Movement
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
