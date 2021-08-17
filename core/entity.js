export class Entity {
  contructor(id) {
    this.components;
    this.body;
    this.mesh;
    this.id = id || this.generateId();
  }

  createBody(data) {
    // Creating a player mesh
    const mesh = box.Engine.Mesh.CreateBox("player-mesh", this.id);
    // const mesh = box.Engine.Mesh.CreateSphere("player-mesh", 1);
    mesh.scaling.x = 0.5;
    mesh.scaling.z = 0.5;

    // Adding mesh body in noa
    box.Engine.noa.entities.addComponent(
      this.id,
      box.Engine.noa.entities.names.mesh,
      {
        mesh,
        offset: data.offset,
      }
    );

    // add entityTick
    box.Engine.noa.entities.addComponent(this.id, box.entityTick);

    this.mesh = mesh;
    this.body = box.Engine.noa.entities.getPhysicsBody(this.id);

    this.body.onCollide(100);
    this.body.friction = 0;
    this.body.linearDamping = 1;
    this.body.boxEntity = this;

    return mesh;
  }

  addComponent(componentName) {
    this.components = {
      [componentName]: new loader.loadedComponents[componentName](1),
      id: this.id,
    };
  }
  lifeSpend(id, milisecond) {
    setTimeout(() => {
      box.Engine.noa.entities.deleteEntity(id);
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

  tick(dt, states) {
    // console.log("testing entity tick")

    let pos = this.body.getPosition();

    // gradually slow down the body to stop using linearDamping
    // this.body.velocity[0] = Math.max(0, this.body.velocity[0] - this.body.linearDamping);

    /**
      this.body.setPosition([
      Math.max(1, Math.min(pos[0], 19)),
      pos[1],
      Math.max(1, Math.min(pos[2], 19)),
    ]);
     */

    //box.Engine.noa.setBlock(0, 1, 1);

    // console.log(pos, this.body.getPosition());
  }

  //
  // } else {
}
