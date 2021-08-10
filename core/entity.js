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
    this.body.boxEntity = this;

    return mesh;
  }

  addComponent(componentName) {
    this.components = {
      [componentName]: new loader.loadedComponents[componentName](1),
      id: this.id,
    };
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
    // console.log("testing entity tick")

    let pos = this.body.getPosition();

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

  // if (data.type === "sphere") {
  //   var ents = box.Engine.noa.entities;
  //   // getting the player position
  //   var startingPosition = ents.getPosition(box.Engine.noa.playerEntity);

  //   // creating a ball Mesh
  //   const ballMesh = box.Engine.Mesh.CreateSphere(
  //     "ball",
  //     6,
  //     this.height * this.radius,
  //     box.Engine.noa.rendering.getScene()
  //   );

  //   // Ball setting
  //   var position = [startingPosition[0], startingPosition[1] + 0.5, startingPosition[2]];
  //   var mesh = ballMesh.createInstance("ball_instance");
  //   //var meshOffset = [0, this.radius, 0];
  //   var doPhysics = true;

  //   // Getting the entity id && adding
  //   var id = ents.add(
  //     position,
  //     this.width,
  //     this.height,
  //     mesh,
  //     data.offset,
  //     doPhysics
  //   );
  //   return id;
  // } else {
}
