var BABYLON = require("babylonjs");

var engine = new BABYLON.NullEngine();
var scene = new BABYLON.Scene(engine);

global.XMLHttpRequest = require("xhr2").XMLHttpRequest;

var engine = new BABYLON.NullEngine();
var scene = new BABYLON.Scene(engine);

var light = new BABYLON.PointLight(
  "Omni",
  new BABYLON.Vector3(20, 20, 100),
  scene
);

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
  function (newMeshes) {
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
