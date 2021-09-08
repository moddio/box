const { Entity } = require('./entity');

class Projectile extends Entity {
  constructor(data) {
    data.type = 'projectile';
    super(data);

    if (data.streamMode == undefined) {
      this.streamMode = {
        enabled: false
      };
    }
  }
}

module.exports = { Projectile };
