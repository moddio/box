export class Entity {
  constructor() {
    this.components;
    this.body;
    this.mesh;
    this.id = this.generateId();
    // set ID of the entity in NOA as 1 if it's my player's main unit. otherwise we use box entity id.
    /**
     if (box.Engine.myUnit?.id === this.id) {
      this.noaEntityId = 1;
    } else {
      this.noaEntityId = this.id;
    }
     */

    this.noaEntityId = 1;
  }

  createBody(data) {
    // Creating a player mesh

    const mesh = box.Engine.Mesh.CreateBox("player-mesh");
    //box.Engine.Mesh.CreateBox()
    // const mesh = box.Engine.Mesh.CreateSphere("player-mesh", 1);
    mesh.scaling.x = 0.5;
    mesh.scaling.z = 0.5;

    // Adding mesh body in noa
    //console.log("createBody", this.noaEntityId);
    box.Engine.noa.entities.addComponent(
      this.noaEntityId,
      box.Engine.noa.entities.names.mesh,
      {
        mesh,
        offset: data.offset,
      }
    );

    // add entityTick
    box.Engine.noa.entities.addComponent(this.noaEntityId, box.entityTick);

    this.mesh = mesh;
    this.body = box.Engine.noa.entities.getPhysicsBody(this.noaEntityId);

    this.body.onCollide(100);
    this.body.friction = 0;
    this.body.linearDamping = 0.5;
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
    // console.log(this.body.velocity)

    this.body.velocity[0] =
      this.body.velocity[0] / (1 + this.body.linearDamping);
    this.body.velocity[2] =
      this.body.velocity[2] / (1 + this.body.linearDamping);

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
