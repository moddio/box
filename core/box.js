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
export const edgeMap = { width: 20, height: 20 };
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

export const entityTicks = (name, state, system) =>
  box.Engine.noa.entities.createComponent({
    name,
    state,
    system,
  });
