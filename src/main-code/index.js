// engine import
import { Engine } from "noa-engine";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { io } from "socket.io-client";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

// code import
import "./utils/state.min.js";
import { config } from "./config/config";
import gameBuild from "./ui/game-build.js";
import { newPlayer } from "./players/players.js";
import genWorld from "./ui/genWorld.js";
import eventPlayer from "./utils/eventHandler.js";

const noa = new Engine(config);

const socket = io("http://localhost:3000");

socket.emit("player", "clicoder");

let player1En = newPlayer(noa);
let player2En = newPlayer(noa);

socket.on("All players data", ({ player1, player2 }) => {
  player1.length <= 0 ? "" : player1En.applyImpulse([...player1]);
  player2.length <= 0 ? "" : player2En.applyImpulse([...player2]);
});

// Generate the world
genWorld(noa);
const scene = noa.rendering.getScene();

// Player Setup
const player = noa.playerEntity;
const mesh = Mesh.CreateBox("player-mesh", 1, scene);
noa.entities.addComponent(player, noa.entities.names.mesh, {
  mesh,
  offset: [0, 0.5, 0],
});

// Multiplayer logic

eventPlayer(noa);

// Event listner for changing build materials
gameBuild();
