// engine import
import { Engine } from "noa-engine";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { io } from "socket.io-client";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

// code import
import "./utils/state.min.js";
import { config } from "./config/config";
import { newPlayer } from "./players/players.js";
import genWorld from "./ui/genWorld.js";
import eventPlayer from "./utils/eventHandler.js";

const noa = new Engine(config);

// Generate the world
genWorld(noa);
const scene = noa.rendering.getScene();

// Player Setup
let player = noa.playerEntity;
const mesh = Mesh.CreateBox("player-mesh", 1, scene);
noa.entities.addComponent(player, noa.entities.names.mesh, {
  mesh,
  offset: [0, 0.5, 0],
});

// initital player postion
var playerPosition = [0, 10, 0];
var playerName;

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  playerName = socket.id.toString();

  // emit your data to to the server socket
  socket.emit("players", {
    name: playerName,
    position: [...playerPosition],
  });
});

// listening for player change
socket.on("players", (players) => console.log("client players", players));

// Multiplayer logic
eventPlayer(noa);

window.addEventListener("keypress", () => {
  // Get player Position
  var ents = noa.entities;
  var playPos = ents.getPosition(noa.playerEntity);
  playerPosition = [playPos[0], playPos[1] + 0.5, playPos[2]];

  // Emit position change to the server
  socket.emit("players", {
    name: playerName,
    position: playerPosition,
  });

  return;
});
