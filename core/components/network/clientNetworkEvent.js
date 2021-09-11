const { ServerNetworkComponent } = require('./serverNetworkComponent');

class clientNetworking extends ServerNetworkComponent {
  constructor() {
    super();
    BOX.socket.on('connect', () => {
      BOX.socket.on('addEntity', data => {
        BOX.Engine.addEntity(data);
      });

      BOX.socket.on('removeEntity', entityId => {
        /*const a = BOX.Engine.getEntityBySocketID(entityId);
        let {
          mainUnit: { noaEntityId }
        } = BOX.Engine.getEntityBySocketID(entityId);

        BOX.Engine.removeEntity(entityId, noaEntityId);*/
        //BOX.Engine.removeEntity(entityId);
      });

      BOX.socket.on('addAllEntities', data => {
        Object.values(data).forEach((entity, index) => {
          BOX.Engine.addEntity(entity);
        });
      });
  });
}
}

module.exports = { clientNetworking };
