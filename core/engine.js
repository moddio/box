// Engine
import * as BABYLON from "@babylonjs/core";
import { Engine } from "noa-engine";
import { io } from "socket.io-client";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

// Files
import "./utils/state.min.js";
import { config } from "./config/config";
import generateWorld from "./world.js";
//import blockSelector from "../core/component/editor/ui/blockSelector";
//import Player from "../core/player";

// engine import
//import ControlManager from "../core/component/control/controlManager.js";
import UnitManager from "./unitManager.js";
import PlayerManager from "./playerManager";

// Socket
import {
  playersDataEvent,
  playersEvent,
  removePlayerEvent,
  removeBlockEvent,
  createBlockEvent,
} from "./networking/clientNetworkEvent";

const noa = new Engine(config);

// we can't use engine as keyword class because is reserved for noa Engine
class ModEngine {
  constructor() {
    this.unitManager = new UnitManager(noa);
    this.playerManager = new PlayerManager(noa);
    this.body;
    this.snapshot = [{ id: 1, position: [] }];
    this.rotation = 0;
  }
  start() {
    console.log("starting the noa engine...");

    // on connection the player will be created
    this.body = this.playerManager.createPlayer(1);
    // Generate the world
    generateWorld(noa);
    const scene = noa.rendering.getScene();

    // Enable physics in the scene
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );
    noa.on("tick", () => this.engineStep.bind(this)());
  }
  engineStep() {
    let playerPositionChecker = [...noa.entities.getPosition(1)];
    let current = noa.camera.getDirection()[0];
    let persistanceRot = 0.01;
    if (current > 0 && this.rotation !== current) {
      this.body.rotatePOV(0, persistanceRot + 0.01, 0);
    }
    if (current < 0 && this.rotation !== current) {
      this.body.rotatePOV(0, -persistanceRot - 0.01, 0);
    }
    this.rotation = current;
    for (let elem in this.snapshot) {
      // Get the position of each entity
      noa.entities.getPosition(this.snapshot[elem].id);
      if (this.snapshot[elem].id === 1) {
        // if the id is the player entity id
        let playerPosition = noa.entities.getPosition(1);
        for (let elem in playerPosition) {
          // check if the player has moved
          if (playerPositionChecker[elem] !== playerPosition[elem]) {
            playerPositionChecker = [...playerPosition];
            // update the snapshot with new player position
            this.snapshot[0].position = [...playerPosition];
            console.log("the player of the entity with id === 1 has moved");
          }
        }
      }
    }
  }
}

const engine = new ModEngine(noa);
engine.start();
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
