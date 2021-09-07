import { Entity } from './entity.js';

export class Unit extends Entity {
  constructor(data) {
    data.type = 'unit';
    super(data); // run Entity's constructor

    this.check = 0;
    // Default radius
    this.val = 0;

    this.moveDirection; // x, y, z rotations

    this.ownerPlayer = data.ownerPlayer;
    // a player's 1st unit will automatically be assigned as the main unit
    if (this.ownerPlayer) {
      if (this.ownerPlayer.mainUnit == undefined) {
        this.ownerPlayer.mainUnit = this;
      }
    }

    //this.resetPosition();

    // this.body.onCollide(100);
    // this.body.boxEntity = this;

    if (data.streamMode == undefined) {
      this.streamMode = {
        enabled: true,
        stateChange: true,
        attributes: true,
        movement: true,
        csp: true // this unit's owner player will ignore the server streaming received for his own unit
      };
    }
  }

  /*showCrosshair() {

    var utilLayer = new BABYLON.UtilityLayerRenderer(scene);

    let w = 128;

    let texture = new BABYLON.DynamicTexture("reticule", w, scene, false);
    texture.hasAlpha = true;

    let ctx = texture.getContext();
    let reticule;

    const createNavigate = () => {
      ctx.fillStyle = "transparent";
      ctx.clearRect(0, 0, w, w);

      ctx.strokeStyle = "rgba(48, 48, 48, 0.9)";
      ctx.lineWidth = 3.5;
      ctx.moveTo(w * 0.5, w * 0.25);
      ctx.lineTo(w * 0.5, w * 0.75);

      ctx.moveTo(w * 0.25, w * 0.5);
      ctx.lineTo(w * 0.75, w * 0.5);
      ctx.stroke();
      ctx.beginPath();

      texture.update();
    };

    createNavigate();

    let material = new BABYLON.StandardMaterial("reticule", scene);
    material.diffuseTexture = texture;
    material.opacityTexture = texture;
    material.emissiveColor.set(0, 0, 0);
    material.disableLighting = true;

    let plane = BABYLON.MeshBuilder.CreatePlane("reticule", { size: 0.04 }, utilLayer.utilityLayerScene);
    plane.material = material;
    plane.position.set(0, 0, 1.1);
    plane.isPickable = false;
    plane.rotation.z = Math.PI / 4;

    reticule = plane;

    //reticule.parent = BOX.Engine.noa.camera._children[0];
  }*/

  shootBall() {
    let projectile = BOX.Engine.addEntity({
      type: 'Projectile',
      doPhysics: true,
      body: {
        offset: [0, 0.5, 0],
        type: 'CreateSphere',
        unitName: 'ball',
        width: 1,
        height: 1,
        radius: 0.2,
        roundShap: [6, 0.4],
        restitution: 0.8,
        friction: 0.7
      }
    });

    // // adding component for collision
    // BOX.Engine.noa.entities.addComponent(
    //   noaId,
    //   BOX.Engine.noa.entities.names.collideEntities,
    //   {
    //     cylinder: true,
    //     callback: (otherEntsId) => BOX.collision(noaId, otherEntsId),
    //   }
    // );

    // var body = BOX.Engine.noa.entities.getPhysicsBody(noaId);

    const direction = BOX.Engine.noa.camera.getDirection();
    var impulse = [];
    for (let i = 0; i < 3; i++) {
      impulse[i] = 2 * direction[i];
      impulse[1] += 1;
    }
    projectile.body.applyImpulse(impulse);
  }

  /*createItem () {
    let spawnRegion = BOX.Engine.getEntityByName("item_spawn");
    let spawnPosition = spawnRegion.getRandomPosition();
      const item = BOX.Engine.addEntity({
          type: 'Item',
          //name: ,
          position: spawnPosition,
          doPhysics: true,
          body: {
            offset: [0, 0, 0],
            type: 'CreateBox',
            offset: [0, 0, 0],
            radius: 0.2,
            width: 5,
            height: 8,
            roundShap: [null, null],
            scaling: { "x": 0.1, "y": 0.1, "z": 1.5 },
            linearDamping: 0.5,
            friction: 0
          }
        });

        item.allowPickUp();

        /*BOX.Engine.noa.entities.addComponent(item.noaEntityId, BOX.Engine.noa.entities.names.collideEntities, {
          cylinder: true,
          callback: otherEntsId => { 
            
            let player = BOX.Engine.getEntityByName("john"); //TEMPORARY - need to find unit by noaId
            console.log('item collide unit', item.noaEntityId, otherEntsId, player) 
            player.unit.attachItem(item);
            BOX.Engine.noa.entities.removeComponent(item.noaEntityId, BOX.Engine.noa.entities.names.collideEntities);
          }
        });*/

  //this.attachItem(item)
  //}

  equipItem(item) {
    if (!item.attachedTo) {
      // make item following the unit
      BOX.Engine.noa.ents.addComponent(item.noaEntityId, 'followsEntity', {
        entity: this.noaEntityId,
        offset: [0, 0.5, 0]
      });
      item.attachedTo = this;
      this.equipedItem = item;
      console.log('attached to', this);
    }
  }

  unequipItem() {
    if (this.equipedItem) {
      // make item stop following the unit
      noa.ents.removeComponent(this.equipedItem.noaEntityId, 'followsEntity');
      this.equipedItem.allowPickUp();
      this.equipedItem.attachedTo = null;
      this.equipedItem = null;
    }
  }

  getOwnerPlayer() {
    return this.ownerPlayer;
  }

  resetPosition() {
    this.body.setPosition([10, 10, 10]);
  }

  destroy() {
    super.destroy();
  }

  tick() {
    super.tick(); // call Entity.tick()

    // apply linear damping
    this.body.velocity[0] = this.body.velocity[0] / (1 + this.body.linearDamping);
    this.body.velocity[2] = this.body.velocity[2] / (1 + this.body.linearDamping);

    // Getting force value from cos sin
    let angle = BOX.Engine.noa.camera.heading;
    let force = 2;
    let y = force * Math.cos(angle);
    let x = force * Math.sin(angle);

    // Rotation
    this.mesh.rotation.y = BOX.Engine.noa.camera.heading;

    // this has to be fixed
    if (BOX.inputs.state['jump'] && Math.abs(this.body.velocity[1]) <= 0) {
      this.body.applyImpulse([0, 10, 0]);
    }
    if (BOX.inputs.state['move-left']) {
      this.body.applyImpulse([-y, 0, x]);
    }
    if (BOX.inputs.state['move-right']) {
      this.body.applyImpulse([y, 0, -x]);
    }
    if (BOX.inputs.state['move-up']) {
      this.body.applyImpulse([x, 0, y]);
    }
    if (BOX.inputs.state['move-down']) {
      this.body.applyImpulse([-x, 0, -y]);
    }
  }
}

export default Unit;
