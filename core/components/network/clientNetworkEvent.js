const { NetworkComponent } = require('./serverNetworkComponent');

class clientNetworking extends NetworkComponent {
  constructor() {
    super();
    BOX.socket.on('connect', () => {
      BOX.socket.on('addEntity', data => {
        BOX.Engine.addEntity(data);
      });

      //NOT WORKING YET
      BOX.socket.on('removeEntity', entityId => {
        BOX.Engine.removeEntity(entityId);
      });

      //MY SUGGESTION FOR CLIENT FIRST CONNECTION - NOT WORKING YET
      BOX.socket.on('addAllEntities', data => {
        data.forEach(element => {
          BOX.Engine.addEntity(element);
        }); 
      });
      
      BOX.socket.on('snapshot', snapshot => {
        for (id in snapshot) {
          let entity = BOX.Engine.entities[id]
          let snapshotData = snapshot[id];
          if (entity) {
            entity.setPosition(snapshotData.x, snapshotData.y, snapshotData.z)
          }
        }        
      });

    });
  }
}

module.exports = { clientNetworking };
