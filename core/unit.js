import * as BABYLON from "@babylonjs/core";
import NameLabel from "./components/nameLabelComponent";
import { Entity } from "./entity";

export class Unit extends Entity {
  constructor(data) {
    data.type = "unit"
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

    this.resetPosition();

    // this.body.onCollide(100);
    // this.body.boxEntity = this;

    this.NameLabel = new NameLabel();

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

  /*showNameLabel() {
    this.label = BOX.Mesh["CreatePlane"]("Label");

    var playPos = BOX.Engine.noa.entities.getPosition(1);
    var pos = [playPos[0], playPos[1] + 1.5, playPos[2]];
    var width = 0;
    var height = 0;

    var meshOffset = [0, 0, 0];
    var doPhysics = false;
    
    var noaId = BOX.Engine.noa.entities.add(
      pos,
      width,
      height,
      this.label,
      meshOffset,
      doPhysics
    );
    this.noaEntityId = noaId;

    //Create dynamic texture
    let dynamicTexture = new BABYLON.DynamicTexture(
      "DynamicTexture",
      { width: 200, height: 200 },
      scene
    );

    //Draw text
    dynamicTexture.drawText(
      "Player name",
      null,
      null,
      "36px Arial",
      "black",
      "transparent",
      true
    );
    dynamicTexture.hasAlpha = true;

    //create material
    let mat = new BABYLON.StandardMaterial("mat", scene);
    mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    mat.disableLighting = true;
    mat.backFaceCulling = false;

    //apply material
    mat.diffuseTexture = dynamicTexture;
    this.label.material = mat;

    BOX.Engine.noa.ents.addComponent(noaId, "followsEntity", {
      entity: 1,
      offset: [0, 2, 0],
    });
  }*/

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
      type: "Projectile",
      body: {
        offset: [0, 0.5, 0],
        type: "CreateSphere",
        unitName: "ball",
        width: 1,
        height: 1, 
        radius: 0.2,
        roundShap: [6, 0.4],
        restitution: 0.8,
        friction: 0.7,
      },
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
    this.body.velocity[0] =
      this.body.velocity[0] / (1 + this.body.linearDamping);
    this.body.velocity[2] =
      this.body.velocity[2] / (1 + this.body.linearDamping);

    // Getting force value from cos sin
    let angle = BOX.Engine.noa.camera.heading;
    let force = 2;
    let y = force * Math.cos(angle);
    let x = force * Math.sin(angle);

    // Rotation
    this.mesh.rotation.y = BOX.Engine.noa.camera.heading;

    // this has to be fixed
    if (BOX.inputs.state["jump"] && Math.abs(this.body.velocity[1]) <= 0) {
      this.body.applyImpulse([0, 10, 0]);
    }
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

    if (this.NameLabel) {
      this.NameLabel.label.rotation.y = BOX.Engine.noa.camera.heading;
    }
  }
}

export default Unit;
