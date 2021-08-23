// Engine
import * as BABYLON from "@babylonjs/core";
import { Engine as noaEngine } from "noa-engine";
import config from "../config/config.json";
import { movementComp } from "../core/components/movement";

import SaveMapButton from "./components/editor/ui/mapSaver";
import developerModeButton from "./components/editor/ui/developerMode";

// Files
import "./utils/state.min.js";
import generateWorld from "./world.js";
import { Entity } from "./entity.js";

export class Engine extends Entity {
  constructor() {
    super();
    this.noa = new noaEngine(config);
    this.entities = {};
    this.myPlayer;
    this.numberOfTicks = 0;
    this.currentTime = 0;
  }
  start() {
    console.log("starting the noa engine...");

    // Generate the world
    generateWorld();

    const scene = this.noa.rendering.getScene();

    this.noa.camera.sensitivityX = 5;
    this.noa.camera.sensitivityY = 5;

    // Enable physics in the scene
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );

    // create my own unit by default
    this.myPlayer = new BOX.Player({
      name: "john",
    });

    this.myPlayer.createUnit();

    // run unit ticks
    // unit.tick();
    // developerModeButton();
  }

  loadMap(mapData) {}

  engineStep() {
    this.noa.on("tick", () => {
      // Update engine time on each tick
      this.numberOfTicks++;
      this.tickStart = Date.now();
      // Call player ticks
      this.myPlayer.tick(); // this is a terrible implementation. it should be ticked along with other entities below.

      for (let id in this.entities) {
        let entity = this.entities[id];
        entity.tick();
      }

      this.tickDelta = Date.now() - this.tickStart;
      this.currentTime += this.tickDelta;
    });
  }

  getEntity(id) {
    return;
  }

  addEntity(data) {
    let entityType = data.type;
    if (entityType) {
      let entity = new BOX[entityType](data);
      this.entities[entity.id] = entity;
      return entity;
    } else {
      error("entity type not defined");
    }
  }

  removeEntity(id, noaID) {
    this.noa.entities.deleteEntity(noaID);
    delete this.entityIds[id];
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
