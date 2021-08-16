import { Engine as boxEngine } from "./engine";
import { Player as importedPlayer } from "./player";
import { Unit as importedUnit } from "./unit";
import { Projectile as importProjectile } from "./projectile";
import {
  MovementState,
  applyMovementPhysics,
} from "../core/components/movement";

export var isClient = window ? true : false;
export var isServer = !isClient;
export const Projectile = importProjectile;
export const Engine = new boxEngine();
export const Player = importedPlayer;
export const Unit = importedUnit;
export const edgeMap = {
  maxWidth: 20,
  maxHeight: 20,
  minHeight: 0,
  minWidth: 0,
};

export const mapData = [];

export const collision = (id, otherEntsId) => {
  let entityOne = box.Engine.noa.entities.getPosition(id);
  let entityTwo = box.Engine.noa.entities.getPosition(otherEntsId);
  let bodyPlayer = box.Engine.noa.entities.getPhysicsBody(1);
  let bodyBall = box.Engine.noa.entities.getPhysicsBody(id);
  var check;

  console.log("ball velocity", bodyBall.velocity);

  // checking the speed of the player and the ball
  if (
    Math.abs(bodyPlayer.velocity[2]) + Math.abs(bodyBall.velocity[2]) > 7 ||
    Math.abs(bodyPlayer.velocity[1]) + Math.abs(bodyBall.velocity[1]) > 7 ||
    Math.abs(bodyPlayer.velocity[0]) + Math.abs(bodyBall.velocity[0]) > 7
  ) {
    check = 20;
  } else {
    // cheking the speed of the player and applying bigger impulse on higher speed
    Math.abs(bodyPlayer.velocity[0]) > 6 ||
    Math.abs(bodyPlayer.velocity[1]) > 6 ||
    Math.abs(bodyPlayer.velocity[2]) > 6
      ? (check =
          7 *
          (bodyPlayer.velocity[0] +
            bodyPlayer.velocity[1] +
            bodyPlayer.velocity[2]))
      : (check = 7);
  }

  let impulse = [];
  for (let i = 0; i < 3; i++) {
    impulse[i] = check * (entityOne[i] - entityTwo[i]);
  }
  let body = box.Engine.noa.entities.getPhysicsBody(id);
  body.applyImpulse(impulse);
};

export const inputs = require("game-inputs")();
/**

export const movementComp = box.Engine.noa.entities.createComponent({
  name: "movemen",
  order: 30,

  state: new MovementState(),

  onAdd: null,

  onRemove: null,

  system: function movementProcessor(dt, states) {
    var ents = box.Engine.noa.entities;
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      var phys = box.Engine.noa.entities.getPhysics(state.__id);
      applyMovementPhysics(dt, state, phys.body);
    }
  },
});

 */

export const entityTick = Engine.noa.entities.createComponent({
  name: "entityTick",
  order: 1,
  states: {
    initPlayerPos: true,
    playerMovingFaster: false,
    jumpping: false,
    maxVelocity: 7,
  },
  system: Engine.entityTick,
});
