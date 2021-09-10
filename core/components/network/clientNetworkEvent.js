const { NetworkComponent } = require('./networkComponent');

class clientNetworking extends NetworkComponent {
  constructor() {
    super();
    BOX.socket.on('connect', () => {
      BOX.socket.on('addEntity', data => {
        console.log('DATA FROM SERVER', data)
        BOX.Engine.addEntity(data);
      });

      BOX.socket.on('removeEntity', entityId => {
        BOX.Engine.removeEntity(entityId);
      });

      BOX.socket.on('addAllEntities', data => {
        Object.values(data).forEach((entity, index) => {
          BOX.Engine.addEntity(entity);
          data.type = 'Unit';                   // NEED TO FIX
          data.body = 'default';
          BOX.Engine.addEntity(entity);
        });
      });
    });
  }
}

module.exports = { clientNetworking };
