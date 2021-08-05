// Engine
import * as BABYLON from "@babylonjs/core";
import { Engine as noaEngine } from "noa-engine";
import { Mesh as noaMesh } from "@babylonjs/core/Meshes/mesh";
import config from "../config/config.json";

// Files
import "./utils/state.min.js";
import generateWorld from "./world.js";
import { Entity } from "./entity.js";

// loading map imports
import { water, blocks } from "./utils/textures";
import map from "../config/map/map.json";
import loadMap from "./components/map/tiledLoader";

export class Engine extends Entity {
  constructor() {
    super();
    this.noa = new noaEngine(config);
    this.noa.inputs.unbind("forward");
    this.noa.inputs.unbind("left");
    this.noa.inputs.unbind("backward");
    this.noa.inputs.unbind("right");
    this.Mesh = noaMesh;
    this.entities = {};
    if (box.isClient) {
      this.myPlayer = undefined;
    }
  }
  start() {
    console.log("starting the noa engine...");

    // Generate the world
    generateWorld();

    const scene = this.noa.rendering.getScene();

    // Enable physics in the scene
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );

    // setting the player Unit as main unit
    let player = new box.Player({
      name: "john",
      player: box.Engine.noa.playerEntity,
    });
    let unit = new box.Unit({ owner: player.getMainUnit() });

    // Asign the offset to the created body
    unit.createBody({ offset: [0, 0.5, 0], type: "mesh" });

    // Run player ticks for rotation
    unit.playerTick();
  }

  loadMap(mapData) {}

  engineStep() {
    if (global.isServer) {
      this.serverNetworkComponent.createSnapshot(this.body);
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
