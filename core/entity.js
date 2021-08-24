import * as BABYLON from "@babylonjs/core";
export class Entity {
  constructor(data = {}) {
    this.components = [];
    this.body;
    this.mesh;
    this.id = this.generateId();
    //this.noaEntityId = data.noaEntityId;
    this.type = undefined;
    this.lifeSpan = undefined;
    this.createdAt = Date.now();
    this.streamMode(1);
  }

  createBody(bodyData) {
    // Creating a player mesh
    const mesh = BOX.Mesh[bodyData.type](
      bodyData.unitName,
      bodyData.roundShap[0],
      bodyData.roundShap[1]
    );

    if (bodyData.scaling) {
      mesh.scaling.x = bodyData.scaling.x;
      mesh.scaling.y = bodyData.scaling.y;
      mesh.scaling.z = bodyData.scaling.z;
    }
    // set ID of the entity in NOA as 1 if it's my player's main unit. otherwise we use box entity id.
    if (BOX.Engine.myPlayer && BOX.Engine.myPlayer.mainUnit == this) {
      console.log("creating body for my unit", this);
      this.noaEntityId = 1;
      BOX.Engine.noa.entities.addComponent(
        1,
        BOX.Engine.noa.entities.names.mesh,
        {
          mesh,
          offset: [0, 0.5, 0],
        }
      );
      /*mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: 80,
        friction: 0.5,
        restitution: 0.5,
        nativeOptions: {
            noSleep: true,
            move: true
        }}, scene);*/
      
    } else {
      console.log("creating body for projectile", this);
      this.noaEntityId = this.id;

      // syntatic sugar for creating a default entity
      var playPos = BOX.Engine.noa.entities.getPosition(1);
      var pos = [playPos[0], playPos[1] + 0.5, playPos[2] + 2];
      var width = 0.7;
      var height = 0.7;

      //var mesh = ballMesh.createInstance("ball_instance");
      var meshOffset = [0, 0.5, 0];
      var doPhysics = false;

      this.noaEntityId = BOX.Engine.noa.entities.add(
        pos,
        width,
        height, // required
        mesh,
        meshOffset,
        doPhysics
      );

      /*mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
        mesh,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 1 },
        scene
      );*/
    }
    this.mesh = mesh;
    let body = BOX.Engine.noa.entities.getPhysicsBody(this.noaEntityId);
    body.linearDamping = bodyData.linearDamping;
    body.friction = bodyData.friction;

    return body;
  }

  addComponent(componentName) {
    /*this.components = {
      [componentName]: new loader.loadedComponents[componentName](1),
      id: this.id,
    };*/
    this.components.push({
      [componentName]: new loader.loadedComponents[componentName](1),
      id: this.id,
    });
    if (componentName === "DeveloperMode")
      this.components[1].DeveloperMode.developerModeButton(
        this.components[0].ControlComponent
      );
  }

  destroy() {
    BOX.Engine.removeEntity(this.id, this.noaEntityId);
  }

  removeComponent(componentName) {}

  state(state) {}

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

  /*
      set how this entity will be streamed to all clients
      default mode = {
        enabled: true,
        stateChange: true,
        attributes: true,
        movement: true,
        csp: false // client-side prediction. if enabled, the unit/item's owner player will ignore the streaming he has received for his own unit/item.
        // when both movement & csp are enabled, then we will perform server-side reconciliation
      }
      
      examples:
        regions - {enabled: true, stateChange: false, attributes: false, movement: false}
        players - {enabled: true, stateChange: true, attributes: true, movement: false}
        units (player units) - {enabled: true, stateChange: true, attributes: true, movement: true, csp: true}
        units (furnitures/monsters) - {enabled: true, stateChange: true, attributes: true, movement: true, csp: false}
        item - {enabled: true, stateChange: true, attributes: true, movement: false, csp: true}
        projectiles (bullets) - {enabled: false, stateChange: false, attributes: false, movement: false, csp: true}
        projectiles (grenades) - {enabled: true, stateChange: true, attributes: true, movement: true, csp: false}
  */
  streamMode(mode) {
    if (mode != undefined) {
      this.streamMode = mode;
    }
    return this.streamMode;
  }

  tick() {
    // console.log(this.lifeSpan);
    if (
      this.lifeSpan != undefined &&
      this.lifeSpan + this.createdAt > BOX.Engine.currentTime
    ) {
      this.destroy();
    }

    // console.log("testing entity tick")

    //let pos = this.body.getPosition();

    // gradually slow down the body to stop using linearDamping
    // console.log(this.body.velocity)

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
