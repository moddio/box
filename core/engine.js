
import { Engine as noaEngine } from "noa-engine";
import { config } from "../config/config";
import { Mesh as noaMesh } from "@babylonjs/core/Meshes/mesh";

export const Mesh = noaMesh;

// Engine
import * as BABYLON from "@babylonjs/core";
//import { Engine as noaEngine } from "noa-engine";

// Files
import "./utils/state.min.js";
import generateWorld from "./world.js";
import { Player } from "./player";
import { Unit } from "./unit";
import { Projectile } from "./projectile";
import { Entity } from "./entity.js";

export default class Engine extends Entity {

  constructor() {
    super();
    
    this.noa = new noaEngine(config);
    this.entities = {};
    if (window === undefined) {
      this.isClient = false;
      this.isServer = true;
    } else {
      this.isClient = true;
      this.isServer = false;
    }
  }

  start() {
    console.log("starting the noa engine...");

    // Generate the world
    generateWorld();
    const scene = box.noa.rendering.getScene();

    // Enable physics in the scene
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );
  }
  loadMap(mapData) {}
  engineStep() {
    if (global.isServer) {
      this.serverNetworkComponent.createSnapshot(this.body);
    }
  }
  createEntity(entityType, data = null) {
    switch (entityType) {
      case "unit":
        this.unit = new Unit();
        let body = this.unit.createBody(data.id, data.position);
        this.entities[data.id] = body;
      case "player":
        let player = new Player();
        this.entities[1] = player;
        break;
      case "item":
        let item = new Item();
        this.entities[item.id()] = item;
        break;
      case "projectile":
        let projectile = new Projectile();
        //this.entities[projectile.id()] = projectile;
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
