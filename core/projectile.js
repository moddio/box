import { Entity } from './entity.js';

export class Projectile extends Entity {
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
