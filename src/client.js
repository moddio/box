// Engine
import * as BABYLON from "@babylonjs/core";
import { Engine } from "noa-engine";
import { io } from "socket.io-client";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

// Files
import "../core/utils/state.min.js";
import { config } from "../core/config/config";
import generateWorld from "../core/world.js";
import blockSelector from "../core/component/editor/ui/blockSelector";
import PlayerManager from "../core/playerManager";
import Player from "../core/player";

// Socket
import {
  playersDataEvent,
  playersEvent,
  removePlayerEvent,
  removeBlockEvent,
  createBlockEvent,
} from "../core/networking/clientNetworkEvent";

const noa = new Engine(config);

// Generate the world
generateWorld(noa);
const scene = noa.rendering.getScene();

// Enable physics in the scene
scene.enablePhysics(
  new BABYLON.Vector3(0, -9.8, 0),
  new BABYLON.AmmoJSPlugin()
);

// initial player position to check for movement
let playerPositionChecker = [...noa.entities.getPosition(1)];
let snapshot = [];

// player entity
const playerManager = new PlayerManager(noa);
// creating the player with id === 1
const player = playerManager.createPlayer(1);

//player
const playerEvent = new Player(noa, player);
// init event listener
playerEvent.playerEvent();

console.log("noa lookup", noa);

// Adding player entity to snapshot
snapshot.push({ id: 1, position: [] });

// Traverse all entities on each tick
let rotation = 0;
noa.on("tick", () => {
  let current = noa.camera.getDirection()[0];
  let persistanceRot = 0.01;
  if (current > 0 && rotation !== current) {
    player.rotatePOV(0, persistanceRot + 0.01, 0);
  }
  if (current < 0 && rotation !== current) {
    player.rotatePOV(0, -persistanceRot - 0.01, 0);
  }
  rotation = current;
  for (let elem in snapshot) {
    // Get the position of each entity
    noa.entities.getPosition(snapshot[elem].id);
    if (snapshot[elem].id === 1) {
      // if the id is the player entity id
      let playerPosition = noa.entities.getPosition(1);
      for (let elem in playerPosition) {
        // check if the player has moved
        if (playerPositionChecker[elem] !== playerPosition[elem]) {
          playerPositionChecker = [...playerPosition];
          // update the snapshot with new player position
          snapshot[0].position = [...playerPosition];
          console.log("the player of the entity with id === 1 has moved");
        }
      }
    }
  }
});

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

// Event listener for input of the user (createBlock, edit, movement)
blockSelector(noa, socket);
