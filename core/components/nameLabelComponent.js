const BABYLON = require('@babylonjs/core');

const { Component } = require('./component');

class NameLabel extends Component {
  constructor(parent) {
    super(parent);
    this.label = {};

    //ownerID has noa entity id and id of the entity given by us
    this.ownerId = { noaID: parent.mainUnit.noaEntityId || parent.noaEntityId, id: parent.id };
    this.ownerName = parent.name;

    this.showNameLabel();
  }

  showNameLabel() {
    this.label = BOX.Mesh['CreatePlane']('Label');

    //position of the owner of label
    var ownerPos = BOX.Engine.noa.entities.getPosition(this.ownerId.noaID);

    //calculate position for label
    var pos = [ownerPos[0], ownerPos[1] + 2, ownerPos[2]];
    var width = 0;
    var height = 0;

    var meshOffset = [0, 0, 0];
    var doPhysics = false;

    var noaId = BOX.Engine.noa.entities.add(pos, width, height, this.label, meshOffset, doPhysics);
    this.noaEntityId = noaId;

    //Create dynamic texture
    let dynamicTexture = new BABYLON.DynamicTexture('DynamicTexture', { width: 200, height: 200 }, scene);

    //Draw text
    dynamicTexture.drawText(this.ownerName, null, null, '36px Arial', 'black', 'transparent', true);
    dynamicTexture.hasAlpha = true;

    //create material
    let mat = new BABYLON.StandardMaterial('mat', scene);
    mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    mat.disableLighting = true;
    mat.backFaceCulling = false;

    //apply material
    mat.diffuseTexture = dynamicTexture;
    this.label.material = mat;

    BOX.Engine.noa.ents.addComponent(noaId, 'followsEntity', {
      entity: this.ownerId.noaID,
      offset: [0, 2, 0]
    });
  }

  tick() {
    this.label.rotation.y = BOX.Engine.noa.camera.heading;
    this.label.rotation.x = BOX.Engine.noa.camera.pitch;
  }
}

module.exports = NameLabel;
