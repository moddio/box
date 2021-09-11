const { ServerNetworkComponent } = require('./serverNetworkComponent');

class ClientNetworkComponent extends ServerNetworkComponent {
  constructor() {
    super();
    BOX.socket.on('connect', () => {
      BOX.socket.on('addEntity', data => {
        BOX.Engine.addEntity(data);
      });

      BOX.socket.on('destroyEntity', entityId => {
        BOX.Engine.removeEntity(entityId);
      });

      BOX.socket.on('addAllEntities', data => {
        Object.values(data).forEach((entity, index) => {
          BOX.Engine.addEntity(entity);
        });
      });
    });
  }
}

module.exports = ClientNetworkComponent;
