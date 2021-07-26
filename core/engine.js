// Engine
import * as BABYLON from "@babylonjs/core";
import { Engine as noaEngine } from "noa-engine";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

// Files
import "./utils/state.min.js";
import generateWorld from "./world.js";
import { Unit } from "./unit";
import PlayerManager from "./playerManager.js";
import ServerNetworkManager from "./networking/serverNetworkManager.js";
import { config } from "../core/config/config";

class Engine extends noaEngine {
  constructor() {
    //this.noa = new noaEngine(config);
  }
  start() {
    console.log("starting the this.noa engine...");

    generateWorld(this.noa);
    const scene = this.noa.rendering.getScene();
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );
    this.body = this.playerManager.createPlayer(1);
    this.noa.on("tick", () => this.engineStep.bind(this)());
  }
  loadComponents() {
    this.unit = new Unit();
    //this.playerManager = new PlayerManager(this.noa);
    //this.serverNetworkManager = new ServerNetworkManager(this.noa);
  }
  engineStep() {
    !global.isServer ? this.serverNetworkManager.createSnapshot(this.body) : "";
  }
  setAsServer() {
    this.isServer = true;
    this.isClient = false;
  }

  setAsClient() {
    this.isServer = false;
    this.isClient = true;
  }
}

export const engine = new Engine();

/**
 //player
const playerEvent = new Player(this.noa, player);
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
//blockSelector(this.noa, socket);
