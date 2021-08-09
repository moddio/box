const state = {
  initPlayerPos: true,
  playerMovingFaster: false,
  jumpping: false,
  maxVelocity: 7,
};

const system = (dt, states) => {
  var bodyPlayer = box.Engine.noa.entities.getPhysicsBody(1);
  var playerPos = box.Engine.noa.entities.getPosition(1);
  bodyPlayer.friction = 2;
  for (let elem in states) {
    Math.abs(bodyPlayer.velocity[0]) > states[elem]["maxVelocity"] ||
    Math.abs(bodyPlayer.velocity[1]) > states[elem]["maxVelocity"] ||
    Math.abs(bodyPlayer.velocity[2]) > states[elem]["maxVelocity"]
      ? (states[elem]["faster"] = true)
      : (states[elem]["faster"] = false);

    states[elem]["jumpping"] = bodyPlayer.atRestY() < 0 ? true : false;

    /**
        states[elem]["jumpping"]
      ? (states[elem]["maxVelocity"] = 7)
      : (states[elem]["maxVelocity"] = 0.5);
     */

    if (states[elem]["initPlayerPos"]) {
      bodyPlayer.setPosition([10, 10, 10]);
      states[elem]["initPlayerPos"] = false;
    }

    if (states[elem]["__id"] === 1) {
      if (box.inputs.state["shoot-ball"]) {
        /*
        this.shootProjectile();
        **/
      }

      let angle = box.Engine.noa.camera.heading;
      let force = 2;
      let y = force * Math.cos(angle);
      let x = force * Math.sin(angle);

      if (playerPos[0] <= 1) {
        //left
        bodyPlayer.applyImpulse([y, 0, -x]);
      }
      if (playerPos[0] >= 19) {
        bodyPlayer.applyImpulse([-y, 0, x]);
      }
      if (playerPos[2] >= 19) {
        bodyPlayer.applyImpulse([-x, 0, -y]);
      }
      if (playerPos[2] <= 1) {
        bodyPlayer.applyImpulse([x, 0, y]);
      }

      if (
        box.inputs.state["jump"] &&
        playerPos[1] <= 7 &&
        !states[elem]["faster"]
      ) {
        bodyPlayer.applyImpulse([0, 7, 0]);
      }

      if (
        box.inputs.state["move-left"] &&
        playerPos[0] >= 1 &&
        !states[elem]["faster"]
      ) {
        bodyPlayer.applyImpulse([-y, 0, x]);
      }
      if (
        box.inputs.state["move-right"] &&
        playerPos[0] <= 19 &&
        !states[elem]["faster"]
      ) {
        bodyPlayer.applyImpulse([y, 0, -x]);
      }
      if (
        box.inputs.state["move-up"] &&
        playerPos[2] <= 19 &&
        !states[elem]["faster"]
      ) {
        bodyPlayer.applyImpulse([x, 0, y]);
      }
      if (
        box.inputs.state["move-down"] &&
        playerPos[2] >= 1 &&
        !states[elem]["faster"]
      ) {
        bodyPlayer.applyImpulse([-x, 0, -y]);
      }
    }
  }
};

export const movementComp = {
  name: "entityMovement",
  state: state,
  system: system,
};
