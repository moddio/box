import { inputs } from "./box";
import { Entity } from "./entity";

export class Unit extends Entity {
  constructor(data) {
    super();
    this.id = data.owner;
    // Default radius
    this.radius = 0.2;

    this.width = data.width * this.radius;
    this.height = data.height * this.radius;
    this.moveDirection; // x, y, z rotations
  }
  shootProjectile() {
    // Creating the physics body
    const id = this.createBody({ offset: [0, 0.5, 0], type: "sphere" });
    const body = this.ents.getPhysicsBody(id);

    // Adding params to applyImpulse based on camera direction
    body.restitution = 0.8;
    body.friction = 0.6;
    body.mass = 0.5;
    const dir = box.Engine.noa.camera.getDirection();
    let imp = [];
    for (let i = 0; i < 3; i++) imp[i] = 5 * dir[i];
    imp[1] += 1;
    body.applyImpulse(imp);
  }
  tick() {
    var body = box.Engine.noa.entities.getPhysicsBody(1);
    var lastUpdate = new Date().getTime();

    box.Engine.noa.on("tick", () => {
      if (new Date().getTime() > lastUpdate + 95) {
        if (inputs.state["shoot-ball"]) {
          this.owner = 1;
          this.width = 2;
          this.height = 2;
          this.shootProjectile();
        }

        let angle = box.Engine.noa.camera.heading;
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
      let current = box.Engine.noa.camera.heading;
      this.moveDirection = current;
      this.mesh.rotation.y = current;
      // this.body.applyImpulse("some values about direction and power");

      inputs.tick();
    });
  }
}

export default Unit;
