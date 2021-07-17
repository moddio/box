// Engine
import * as BABYLON from "@babylonjs/core";
import { Engine } from "noa-engine";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { io } from "socket.io-client";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

// Files
import "../core/utils/state.min.js";
import { config } from "../core/config/config";
import generateWorld from "../core/world.js";
import eventPlayer from "../core/utils/eventHandler.js";
import { playerEntity, shootBouncyBall } from "../core/entities";

// Socket
import {
  playersDataEvent,
  playersEvent,
  removePlayerEvent,
  removeBlockEvent,
  createBlockEvent,
} from "../core/networking/clientNetworkEvent";
import { Sound } from "@babylonjs/core";

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
playerEntity(noa);

// Adding player entity to snapshot
snapshot.push({ id: 1, position: [] });

// shoot ball entity in the scene
window.addEventListener("keypress", (e) => {
  if (e.key === "o") {
    let id = shootBouncyBall(noa);
    //snapshot = [...snapshot, noa.entities._storage.position.hash.position];
    snapshot.push({ id, position: [] });
    console.log(snapshot);
  }
});

// Traverse all entities on each tick
noa.on("tick", () => {
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
const socket = io("http://localhost:3000");
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
});

// Event listener for input of the user (createBlock, edit, movement)
eventPlayer(noa, socket);
