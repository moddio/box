// Engine
import * as BABYLON from "@babylonjs/core";
const { Engine: noaEngine } = require("noa-engine");
//import { Engine as noaEngine } from "noa-engine";

// Files
import "./utils/state.min.js";
import { config } from "../config/config";
import generateWorld from "./world.js";
import { Entity } from "./entity";
import { Player } from "./player";
import { Unit } from "./unit";

export class Engine extends Entity {
  constructor() {
    this.noa = new noaEngine(config);
    this.entities = {};
    box = this;
    this.loadComponents();
  }

  start() {
    console.log("starting the noa engine...");

    // Generate the world
    generateWorld(this.noa);
    const scene = this.noa.rendering.getScene();

    // Enable physics in the scene
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );
    
  }

  loadComponents() {
    this.unit = new Unit(this.noa);

    /*
      iterate through all component files inside config/components.json
      and do require(). these components are accessible globally,
      so in any file, we can do var component = new ComponentName()
    */
  }

  engineStep() {
    if (global.isServer) {
      this.serverNetworkComponent.createSnapshot(this.body);
    }
  }
  createEntity(entityType, data) {
    const { id, position } = data;
    switch (entityType) {
      case "unit":
        this.unit = new Unit(this.noa);
        let body = this.unit.createBody(id, position);
        this.entities[id] = body;
      case "player":
        let player = new Player(id);
        this.entities[id] = player;
        break;
      case "item":
        let item = new Item();
        this.entities[item.id()] = item;
        break;
      case "projectile":
        let projectile = new Projectile();
        this.entities[projectile.id()] = projectile;
        break;
    }
  }
  destroyEntity(entityId) {
    delete this.entities[entityId];
  }
}

/**
 //player
const playerEvent = new Player(noa, player);
// init event listener
playerEvent.playerEvent();
 */

/*

// Client side server logic for socket
export const socket = io("http://localhost:3000");
socket.on("connect", () => {
  // Logging out offline players
  socket.on("removePlayer", removePlayerEvent);
  // Listening for player movement change
  socket.on("players", playersEvent);
  // Listening for new block creation
  socket.on("createBlock", createBlockEvent);
  // Listening for new block deletion
  socket.on("removeBlock", removeBlockEvent);
  // Emit your your ID and your initial position to the server
  socket.emit("players", playersDataEvent(socket.id, [0, 10, 0]));
  socket.on("ballshoot", (position) => {
    console.log("ball shoot data", position);
    playerEvent.playerShootBall(position);
  });
});
**/

// Event listener for input of the user (createBlock, edit, movement)
//blockSelector(noa, socket);
