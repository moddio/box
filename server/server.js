import express from 'express';
const app = express();
import { Server } from 'socket.io';
import http from 'http';
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});
import { ServerNetworkEvents } from '../core/components/network/serverNetworkEvent.js';

global.isServer = true;
global.isClient = false;

server.listen(3001, () => {
  console.log('listening on *:3001');
});

// start server networking
console.log('start');
const network = new ServerNetworkEvents(io);
/**
 var BABYLON = require("babylonjs");

var engine = new BABYLON.NullEngine();
var scene = new BABYLON.Scene(engine);

global.XMLHttpRequest = require("xhr2").XMLHttpRequest;

var engine = new BABYLON.NullEngine();
var scene = new BABYLON.Scene(engine);

var camera = new BABYLON.ArcRotateCamera(
  "Camera",
  0,
  0.8,
  100,
  BABYLON.Vector3.Zero(),
  scene
);

BABYLON.SceneLoader.ImportMesh(
  "",
  "https://playground.babylonjs.com/scenes/",
  "skull.babylon",
  scene,
  (newMeshes) => {
    camera.target = newMeshes[0];

    console.log("Meshes loaded from babylon file: " + newMeshes.length);
    for (var index = 0; index < newMeshes.length; index++) {
      console.log(newMeshes[index].toString());
    }

    console.log("render started");
    engine.runRenderLoop(function () {
      scene.render();
    });
  }
);
 */
