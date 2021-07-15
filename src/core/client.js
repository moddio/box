// Engine
import * as BABYLON from "@babylonjs/core";
import { Engine } from "noa-engine";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { io } from "socket.io-client";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

// Files
import "./utils/state.min.js";
import { config } from "./config/config";
import generateWorld from "./world.js";
import eventPlayer from "./utils/eventHandler.js";

// Socket
import {
  playersDataEvent,
  playersEvent,
  removePlayerEvent,
} from "./socket/players.js";
import { removeBlockEvent, createBlockEvent } from "./socket/blocks.js";

const noa = new Engine(config);

// Generate the world
generateWorld(noa);
const scene = noa.rendering.getScene();

// Enable physics in the scene
scene.enablePhysics(
  new BABYLON.Vector3(0, -9.8, 0),
  new BABYLON.AmmoJSPlugin()
);

// Player Setup
let player = noa.playerEntity;
const mesh = Mesh.CreateBox("player-mesh", 1, scene);
noa.entities.addComponent(player, noa.entities.names.mesh, {
  mesh,
  offset: [0, 0.5, 0],
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
eventPlayer(noa);
