import { Engine as boxEngine } from "./engine";
import { Player as importedPlayer } from "./player";
import { Unit as importedUnit } from "./unit";
import { Mesh as noaMesh } from "@babylonjs/core/Meshes/mesh";
import { Projectile as importProjectile } from "./projectile";
import { Region as importRegion } from "./region";
import { Item as importItem } from "./item";
import {
  MovementState,
  applyMovementPhysics,
} from "../core/components/movement";

export var isClient = window ? true : false;
export const components = {};
export var developerMode = {};
export const Mesh = noaMesh;
export var isServer = !isClient;
export const Engine = new boxEngine();
export const Player = importedPlayer;
export const Unit = importedUnit;
export const Projectile = importProjectile;
export const Region = importRegion;
export const Item = importItem;
export const edgeMap = {
  maxWidth: 20,
  maxHeight: 20,
  minHeight: 0,
  minWidth: 0,
};
export const control = {};

// This shouldn't be inside box.js...
export const collision = (id, otherEntsId) => {
  let entityOne = BOX.Engine.noa.entities.getPosition(id);
  let entityTwo = BOX.Engine.noa.entities.getPosition(otherEntsId);
  let bodyPlayer = BOX.Engine.noa.entities.getPhysicsBody(1);
  let bodyBall = BOX.Engine.noa.entities.getPhysicsBody(id);
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
  let body = BOX.Engine.noa.entities.getPhysicsBody(id);
  body.applyImpulse(impulse);
};

export const inputs = require("game-inputs")();
/**

export const movementComp = BOX.Engine.noa.entities.createComponent({
  name: "movemen",
  order: 30,

  state: new MovementState(),

  onAdd: null,

  onRemove: null,

  system: function movementProcessor(dt, states) {
    var ents = BOX.Engine.noa.entities;
    for (var i = 0; i < states.length; i++) {
      var state = states[i];
      var phys = BOX.Engine.noa.entities.getPhysics(state.__id);
      applyMovementPhysics(dt, state, phys.body);
    }
  },
});

 */

export const entityTick = Engine.noa.entities.createComponent({
  name: "entityTick",
  order: 1,
  states: {},
  system: Engine.entityTick,
});
