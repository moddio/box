const state = {
  initPlayerPos: true,
  playerMovingFaster: false,
  jumpping: false,
  maxVelocity: 7,
  boxEntityId: undefined
};
var checker = 0;

const system = (dt, states) => {
  // var bodyPlayer = BOX.Engine.noa.entities.getPhysicsBody(1);
  // var meshData = BOX.Engine.noa.entities.getMeshData(1);
  // var playerPos = BOX.Engine.noa.entities.getPosition(1);
  // for (let elem in states) {
  //   bodyPlayer.friction = 2;
  //   bodyPlayer.gravityMultiplier = 2;
  //   Math.abs(bodyPlayer.velocity[0]) > states[elem]["maxVelocity"] ||
  //   Math.abs(bodyPlayer.velocity[1]) > states[elem]["maxVelocity"] ||
  //   Math.abs(bodyPlayer.velocity[2]) > states[elem]["maxVelocity"]
  //     ? (states[elem]["faster"] = true)
  //     : (states[elem]["faster"] = false);
  //   states[elem]["jumpping"] = bodyPlayer.atRestY() < 0 ? true : false;
  //   /**
  //       states[elem]["jumpping"]
  //     ? (states[elem]["maxVelocity"] = 7)
  //     : (states[elem]["maxVelocity"] = 0.5);
  //    */
  //   if (states[elem]["__id"] === 1) {
  //     bodyPlayer.gravityMultiplier = 2;
  //     if (BOX.inputs.state["shoot-ball"]) {
  //       /*
  //       this.shootProjectile();
  //       **/
  //     }
  //     let current = BOX.Engine.noa.camera.heading;
  //     // console.log("logging state ", BOX.Engine.noa.entities);
  //     if (checker > current) {
  //       // ------------- rotation LOG ---------------------
  //       console.log("log the issue", checker - current);
  //       meshData.mesh.rotatePOV(0, (checker - current) * -1, 0);
  //       // meshData.mesh.rotation.y = current;
  //     }
  //     if (checker < current) {
  //       // ------------- rotation LOG ---------------------
  //       console.log("log the issue", checker - current);
  //       meshData.mesh.rotatePOV(0, (checker - current) * -1, 0);
  //       // meshData.mesh.rotation.y = current;
  //     }
  //     checker = current;
  //     //idex--;
  //     // handle physics boundary
  //     let angle = BOX.Engine.noa.camera.heading;
  //     let force = 2;
  //     let y = force * Math.cos(angle);
  //     let x = force * Math.sin(angle);
  //     //console.log("player position", meshData.mesh.rotatePOV(0, current, 0));
  //     if (playerPos[0] <= 0.9 && states[elem]["velocity"] > 3) {
  //       bodyPlayer.friction = 1000;
  //       bodyPlayer.gravityMultiplier = 1000;
  //     }
  //     if (playerPos[0] >= 19.1 && states[elem]["velocity"] > 3) {
  //       bodyPlayer.friction = 1000;
  //       bodyPlayer.gravityMultiplier = 1000;
  //     }
  //     if (playerPos[2] <= 0.9 && states[elem]["velocity"] > 3) {
  //       bodyPlayer.friction = 1000;
  //       bodyPlayer.gravityMultiplier = 1000;
  //     }
  //     //
  //     if (playerPos[2] >= 19.1 && states[elem]["velocity"] > 3) {
  //       bodyPlayer.friction = 1000;
  //       bodyPlayer.gravityMultiplier = 1000;
  //     }
  //   }
  // }
};

const movementComp = {
  name: 'entityMovement',
  state: state,
  system: system
};

module.exports = { movementComp };
