import { Entity } from './entity';

export class Item extends Entity {
  constructor(data) {
    data.type = 'item';
    super(data);

    this.attachedTo = null;

    // Default radius
    this.radius = 0.2;

    this.width = data.width * this.radius;
    this.height = data.height * this.radius;

    if (data.streamMode == undefined) {
      this.streamMode = {
        enabled: true,
        stateChange: true,
        attributes: false,
        movement: false
      };
    }
  }

  // activate colliding with unit, so unit can pick up item
  allowPickUp () {
    BOX.Engine.noa.entities.addComponent(this.noaEntityId, BOX.Engine.noa.entities.names.collideEntities, {
      cylinder: true,
      callback: otherEntsId => { 
        
        let player = BOX.Engine.getEntityByNoaID(otherEntsId); //TEMPORARY - need to find unit by noaId
        if (player.data.ownerPlayer) {
          console.log('item collide unit', this.noaEntityId, otherEntsId, player) 
          player.equipItem(this);
          //disable pick up after collision with unit
          BOX.Engine.noa.entities.removeComponent(this.noaEntityId, BOX.Engine.noa.entities.names.collideEntities);
        }
        
      }
    });
  }

  tick() {
    super.tick();

    if (this.attachedTo) {
      //console.log('attached');

      //var playPos = BOX.Engine.noa.entities.getPosition(1);
      //var pos = [playPos[0], playPos[1] + 0.5, playPos[2] + 2];
      //this.body.setPosition([playPos[0], playPos[1] + 0.5, playPos[2] + 2]);

      this.mesh.rotation = this.attachedTo.mesh.rotation;
    } 
    else { //NEED TO CHANGE LATER
      this.mesh.rotation.x = 0;
      this.mesh.rotation.y = 0;
      this.mesh.rotation.z = 0;

    }

  }
}
