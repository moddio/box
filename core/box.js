if (!global.isServer) {
  var { Engine: boxEngine } = require('./engine');
  var { Mesh: noaMesh } = require('@babylonjs/core/Meshes/mesh');
  var { io } = require('socket.io-client');
  var inputs = require('game-inputs')();
} else {
  var boxEngine = false;
  var noaMesh = false;
  var io = () => false;
  var inputs = false;
}
const { Player: importedPlayer } = require('./player');
const { Unit: importedUnit } = require('./unit');
const { Projectile: importProjectile } = require('./projectile');
const { Region: importRegion } = require('./region');
const { Item: importItem } = require('./item');

module.exports = BOX = {
  isClient: !global.isServer ? true : false,
  isServer: global.isServer ? true : false,
  socket: io('http://localhost:3001'),
  components: {},
  developerMode: {},
  Mesh: noaMesh,
  Engine: boxEngine,
  Player: importedPlayer,
  Unit: importedUnit,
  Projectile: importProjectile,
  Region: importRegion,
  Item: importItem,
  edgeMap: {
    maxWidth: 20,
    maxHeight: 20,
    minHeight: 0,
    minWidth: 0
  },
  control: {},

  // This shouldn't be inside box.js...
  collision: (id, otherEntsId) => {
    let entityOne = BOX.Engine.noa.entities.getPosition(id);
    let entityTwo = BOX.Engine.noa.entities.getPosition(otherEntsId);
    let bodyPlayer = BOX.Engine.noa.entities.getPhysicsBody(1);
    let bodyBall = BOX.Engine.noa.entities.getPhysicsBody(id);
    var check;

    console.log('ball velocity', bodyBall.velocity);

    // checking the speed of the player and the ball
    if (Math.abs(bodyPlayer.velocity[2]) + Math.abs(bodyBall.velocity[2]) > 7 || Math.abs(bodyPlayer.velocity[1]) + Math.abs(bodyBall.velocity[1]) > 7 || Math.abs(bodyPlayer.velocity[0]) + Math.abs(bodyBall.velocity[0]) > 7) {
      check = 20;
    } else {
      // cheking the speed of the player and applying bigger impulse on higher speed
      Math.abs(bodyPlayer.velocity[0]) > 6 || Math.abs(bodyPlayer.velocity[1]) > 6 || Math.abs(bodyPlayer.velocity[2]) > 6 ? (check = 7 * (bodyPlayer.velocity[0] + bodyPlayer.velocity[1] + bodyPlayer.velocity[2])) : (check = 7);
    }

    let impulse = [];
    for (let i = 0; i < 3; i++) {
      impulse[i] = check * (entityOne[i] - entityTwo[i]);
    }
    let body = BOX.Engine.noa.entities.getPhysicsBody(id);
    body.applyImpulse(impulse);
  },

  inputs
};
