export class Entity {
  contructor() {
    this.components;
    this.ents;
    this.id;
  }

  createBody(data) {
    if (data.type === "sphere") {
      this.ents = box.Engine.noa.entities;
      // getting the player position
      var playPos = this.ents.getPosition(box.Engine.noa.playerEntity);

      // creating a ball Mesh
      const ballMesh = box.Engine.Mesh.CreateSphere(
        "ball",
        6,
        this.height * this.radius,
        box.Engine.noa.rendering.getScene()
      );

      // Ball setting
      var pos = [playPos[0], playPos[1] + 0.5, playPos[2]];
      var mesh = ballMesh.createInstance("ball_instance");
      //var meshOffset = [0, this.radius, 0];
      var doPhysics = true;

      // Getting the entity id && adding
      var id = this.ents.add(
        pos,
        this.width,
        this.height,
        mesh,
        data.offset,
        doPhysics
      );
      return id;
    } else {
      // Creating a player mesh
      const mesh = box.Engine.Mesh.CreateBox("player-mesh", 1);

      // Adding player component using noa
      box.Engine.noa.entities.addComponent(
        this.id,
        box.Engine.noa.entities.names.mesh,
        {
          mesh,
          offset: data.offset,
        }
      );
      this.mesh = mesh;
      return mesh;
    }
  }

  addComponent(componentName) {
    this.id = this.generateId();
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
    // for each this._components, run their tick
    return "working";
  }
  playerTick() {
    // A rotation of mesh demo, still need some logic in it
    let rotation = 0;
    box.Engine.noa.on("tick", () => {
      let current = box.Engine.noa.camera.getDirection()[0];

      if (rotation !== current) {
        console.log("rotation", rotation, "current", current);
        if (current > 0.9 || current < -0.9) {
          rotation = current;
          return;
        }
        if (rotation < current) {
          this.mesh.rotatePOV(0, 0.06, 0);
        }
        if (rotation > current) {
          this.mesh.rotatePOV(0, -0.06, 0);
        }
      }

      rotation = current;
    });
  }
}
