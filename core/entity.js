export class Entity {
  constructor() {
    this.components = [];
    this.body;
    this.mesh;
    this.id = this.generateId();
    this.noaEntityId = undefined;
    this.type = undefined;
    console.log("running entity constructor");
  }

  createBody(data) {
    // Creating a player mesh
    const mesh = BOX.Engine.Mesh[data.type](
      data.unitName,
      data.roundShap[0],
      data.roundShap[1]
    );

    return mesh;
  }

  addComponent(componentName) {
    /*this.components = {
      [componentName]: new loader.loadedComponents[componentName](1),
      id: this.id,
    };*/
    this.components.push({
      [componentName]: new loader.loadedComponents[componentName](1),
      id: this.id,
    })
    if (componentName === "DeveloperMode") this.components[1].DeveloperMode.developerModeButton(this.components[0].ControlComponent);
  }
  
  lifeSpan(id, milisecond) {
    setTimeout(() => {
      BOX.Engine.noa.entities.deleteEntity(id);
    }, milisecond);
  }
  removeComponent(componentName) {}

  setState(stateId) {}

  generateId() {
    return Math.random()
      .toString(36)
      .split("")
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .join("")
      .substr(2, 8);
  }

  setStreamMode(mode) {}

  tick() {
    console.log("running xxxxxxxxxxxxxxxxxxxxxxxxxx");
    // console.log("testing entity tick")

    //let pos = this.body.getPosition();

    // gradually slow down the body to stop using linearDamping
    // console.log(this.body.velocity)

    this.body.velocity[0] =
      this.body.velocity[0] / (1 + this.body.linearDamping);
    this.body.velocity[2] =
      this.body.velocity[2] / (1 + this.body.linearDamping);
    // Getting force value from cos sin
    let angle = BOX.Engine.noa.camera.heading;
    let force = 2;
    let y = force * Math.cos(angle);
    let x = force * Math.sin(angle);

    // Increase gravity when the player is against the floor for now until we figure out why the entity player is stuck on jump

    // Rotation
    let current = BOX.Engine.noa.camera.heading;
    //console.log("ttttttttttttttttttttttttttttttttttttttt", this.mesh);
    this.mesh.rotation.y = current;

    // console.log("logging the velocity state", this.body.velocity);

    // this has to be fixed
    if (BOX.inputs.state["jump"] && Math.abs(this.body.velocity[1]) <= 0) {
      this.body.applyImpulse([0, 10, 0]);
    }
    console.log("running zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
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

    // this.body.velocity[0] = Math.max(0, this.body.velocity[0] - this.body.linearDamping);

    /**
      this.body.setPosition([
      Math.max(1, Math.min(pos[0], 19)),
      pos[1],
      Math.max(1, Math.min(pos[2], 19)),
    ]);
     */

    //BOX.Engine.noa.setBlock(0, 1, 1);

    // console.log(pos, this.body.getPosition());
  }

  //
  // } else {
}
