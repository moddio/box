// engine import
import * as BABYLON from "@babylonjs/core";
import { Engine } from "noa-engine";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { io } from "socket.io-client";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

// code import
import "./utils/state.min.js";
import { config } from "./config/config";
import { shootBouncyBall } from "./fireball/fireball";
import genWorld from "./ui/genWorld.js";
import eventPlayer from "./utils/eventHandler.js";

const noa = new Engine(config);

// Generate the world
genWorld(noa);
const scene = noa.rendering.getScene();

//enable physics in the scene
scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), new BABYLON.AmmoJSPlugin());

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

var allPlayers = [];
var numberOfPlayer = 1;

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  playerName = socket.id.toString();
  // listening for player change
  socket.on("players", ({ data }) => {
    allPlayers = [...data];
    // Count number of player
    while (numberOfPlayer <= allPlayers.length - 1) {
      numberOfPlayer++;
    }
    console.log("allPlayers", allPlayers);
    console.log("number of players", numberOfPlayer);
  });

  // Emit your data to to the server socket
  socket.emit("players", {
    name: playerName,
    position: [...playerPosition],
  });
});

// Multiplayer logic
eventPlayer(noa);

noa.inputs.bind("shoot", "1");
var shoot = () => shootBouncyBall(noa, mesh);
var interval, timeout;
noa.inputs.down.on("shoot", function () {
  shoot();
  timeout = setTimeout(() => {
    interval = setInterval(shoot, 50);
  }, 400);
});
noa.inputs.up.on("shoot", function () {
  clearTimeout(timeout);
  clearInterval(interval);
});

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
