class Entity {
  constructor(data = {}, isEngine) {
    this.data = data;
    this.type = data.type;
    this.name = data.name;
    this.components = {};
    this.mesh;
    this.id = data.id || this.generateId();
    //this.noaEntityId = data.noaEntityId;
    //this.type = undefined;
    this.lifeSpan = undefined;
    this.createdAt = Date.now();
    this.isMyUnit = data.isMyUnit;

    this.doPhysics = true; //IF MAKE THIS FALSE WILL BE ERRORS
    //console.log('DO PHYSICS', this.doPhysics)


    //body by default - with out body show errors now
    if (this.data.body === 'default') {    
      this.data.body = {
        type: 'CreateBox',
        offset: [0, 0.5, 0],
        radius: 0.2,
        width: 5,
        height: 8,
        roundShap: [null, null],
        scaling: { x: 0.6, y: 1, z: 0.6 },
        linearDamping: 0.5,
        friction: 0
      }
    }

    if (data.position) {
      this.startPosition = data.position;
    }

    if (!isEngine) {
      BOX.Engine.entities[this.id] = this;
      if (BOX.isServer) {
        if (this.streamMode && this.streamMode.enabled) {
          BOX.Engine.components['ServerNetworkComponent'].broadcast('addEntity', this.data); // use this.data because it contains id
        }
      }
    }

    if (BOX.isClient) {
      if (this.data.body) {
        this.body = this.createBody(this.data.body);
      }
    }
  }

  createBody(bodyData) {
    // Creating a player mesh
    const mesh = BOX.Mesh[bodyData.type](bodyData.unitName, bodyData.roundShap[0], bodyData.roundShap[1]);

    if (bodyData.scaling) {
      mesh.scaling.x = bodyData.scaling.x;
      mesh.scaling.y = bodyData.scaling.y;
      mesh.scaling.z = bodyData.scaling.z;
    }

    // set ID of the entity in NOA as 1 if it's my player's main unit. otherwise we use box entity id.
    // if (BOX.Engine.myPlayer && BOX.Engine.myPlayer.mainUnit == this) {
    if (this.isMyUnit) {
      //console.log('creating body for my unit', this);
      this.noaEntityId = 1;
      BOX.Engine.noa.entities.addComponent(1, BOX.Engine.noa.entities.names.mesh, {
        mesh,
        offset: [0, 0.5, 0]
      });
    } else {
      //console.log('creating body for projectile', this);
      this.noaEntityId = this.id;

      var noaEntityId = this.noaEntityId;

      if (this.startPosition) {
        pos = [this.startPosition.x, this.startPosition.y, this.startPosition.z];
      } else {
        var playPos = BOX.Engine.noa.entities.getPosition(1);
        var pos = [playPos[0], playPos[1] + 0.5, playPos[2] + 2];
      }

      // syntatic sugar for creating a default entity

      var meshOffset = bodyData.offset;

      this.noaEntityId = BOX.Engine.noa.entities.add(
        pos,
        bodyData.width,
        bodyData.height, // required
        mesh,
        meshOffset,
        this.doPhysics
      );
    }

    this.mesh = mesh;
    if (this.doPhysics) {
      let body = BOX.Engine.noa.entities.getPhysicsBody(this.noaEntityId);
      body.linearDamping = bodyData.linearDamping;
      body.friction = bodyData.friction;

      if (this.startPosition && this.isMyUnit) {
        body.setPosition([this.startPosition.x, this.startPosition.y, this.startPosition.z]);
      }

      return body;
    } else {
      return mesh;
    }
  }

  getEntityID() {
    let id = this.noaEntityId;
    return noaEntityId;
  }

  addComponent(componentName) {
    this.components[componentName] = new loader.loadedComponents[componentName](this);
  }

  hasComponent(componentName) {
    return this.components[componentName] != undefined;
  }

  destroy() {
    if (BOX.isServer) {
      if (this.streamMode && this.streamMode.enabled) {
        BOX.Engine.components['ServerNetworkComponent'].broadcast('removeEntity', this.id());
      }
    }

    BOX.Engine.removeEntity(this.id, this.noaEntityId);
  }

  removeComponent(componentName) {}

  state(state) {}

  generateId() {
    return Math.random()
      .toString(36)
      .split('')
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .join('')
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
    if (this.lifeSpan != undefined && this.lifeSpan + this.createdAt > BOX.Engine.currentTime) {
      this.destroy();
    }

    // execute all added components' tick
    Object.values(this.components).forEach(component => {
      component.tick();
    });

    if (this.body) {
      currentPosition = this.body.getPosition();
      // only enter this entity's data into snapshot if it has moved
      if (currentPosition != this.lastPosition) { 
        BOX.Engine.components['ServerNetworkComponent'].queueStreamData(this.id, [currentPosition.x, currentPosition.y, currentPosition.z]);
      }
    }

  }

}

module.exports = { Entity };
