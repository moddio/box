// engine import
import * as BABYLON from "@babylonjs/core";
import { Engine } from "noa-engine";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { io } from "socket.io-client";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

import "./utils/state.min.js";
import { config } from "./config/config";
import { shootBouncyBall } from "./fireball/fireball";
import genWorld from "./ui/genWorld.js";
import eventPlayer from "./utils/eventHandler.js";
import { filterData } from "../main-code/utils/filterData";

const noa = new Engine(config);

// Generate the world
genWorld(noa);
const scene = noa.rendering.getScene();

//enable physics in the scene
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

// Initital player postion
var playerPosition = [0, 10, 0];
var playerName;
var allPlayers = [];
var numberOfPlayer = 0;
var numberOfBuild = 0;

const socket = io("http://localhost:3000");
const waterID = noa.registry.registerBlock(1, { material: "water" });
const playersCount = document.querySelector(".players");

socket.on("connect", () => {
  playerName = socket.id.toString();

  // logging offline players
  socket.on("removePlayer", (playerName) => {
    numberOfPlayer--;
    playersCount.innerHTML = `Number of players connected ${numberOfPlayer}`;
    console.log(`player ${playerName} is offline`);
  });

  // listening for player change
  socket.on("players", ({ data }) => {
    allPlayers = [...data];
    // Count number of player
    while (numberOfPlayer <= allPlayers.length - 1) {
      numberOfPlayer++;
    }
    playersCount.innerHTML = `Number of players connected ${numberOfPlayer}`;
    console.log("allPlayers", allPlayers);
    console.log("number of players", numberOfPlayer);
  });
  // listening for an event listener
  socket.on("build", ({ build }) => {
    if (numberOfBuild === 0) {
      console.log("Loading build materials");
      setTimeout(() => {
        while (numberOfBuild <= build.length - 1) {
          const pos = [...build[numberOfBuild].water];
          noa.setBlock(waterID, pos[0], pos[1], pos[2]);
          numberOfBuild++;
        }
        console.log("Build data", build, "numberofbuild", numberOfBuild);
      }, 1000);
    } else {
      while (numberOfBuild <= build.length - 1) {
        const pos = [...build[numberOfBuild].water];
        noa.setBlock(waterID, pos[0], pos[1], pos[2]);
        numberOfBuild++;
      }
      console.log("Build data", build, "numberofbuild", numberOfBuild);
    }
  });

  socket.on("removeBuild", (water) => {
    console.log("waterremove", water);
    const pos = [...water];
    noa.setBlock(0, pos[0], pos[1], pos[2]);
    numberOfBuild--;
  });

  // Emit your data to to the server socket
  socket.emit("players", {
    name: playerName,
    position: [...playerPosition],
  });
});
// Multiplayer logic
eventPlayer(noa);

// ball shoot events
noa.inputs.bind("shoot", "5");
var shoot = () => shootBouncyBall(noa, mesh);
var interval, timeout;
noa.inputs.down.on("shoot", function () {
  shoot();
  timeout = setTimeout(() => {
    interval = setInterval(shoot, 800);
  }, 400);
});
noa.inputs.up.on("shoot", function () {
  clearTimeout(timeout);
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
