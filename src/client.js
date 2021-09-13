global.isClient = true;
require('../core/loader');
require('../core/box');

let engine = new BOX.Engine();
BOX.Engine = engine;

engine.start();

var scene = new BABYLON.Scene(engine);

var camera = new BABYLON.ArcRotateCamera('Camera', (3 * Math.PI) / 2, Math.PI / 2.5, 100, BABYLON.Vector3.Zero(), scene);

camera.attachControl(canvas, true);

var light = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(1, 1, 0), scene);

var wood = new BABYLON.StandardMaterial('wood', scene);
wood.diffuseTexture = new BABYLON.Texture('/textures/crate.png');

var blackMat = new BABYLON.StandardMaterial('blackMat', scene);
blackMat.diffuseColor = BABYLON.Color3.Black();

scene.enablePhysics(new BABYLON.Vector3(0, -1, 0), new BABYLON.AmmoJSPlugin(false));

var plugin = scene.getPhysicsEngine().getPhysicsPlugin();
plugin.setTimeStep(1 / 10);

plugin.setFixedTimeStep(1 / 10);

plugin.setMaxSteps(1);

var ground = BABYLON.MeshBuilder.CreateBox('ground', { width: 80, depth: 80, height: 1 }, scene);
ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);

var base = BABYLON.MeshBuilder.CreateBox('base', { width: 6, depth: 6, height: 3 }, scene);
base.position = new BABYLON.Vector3(-26, 2, -9);
base.material = wood;
base.physicsImpostor = new BABYLON.PhysicsImpostor(base, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);

var upright = BABYLON.MeshBuilder.CreateBox('upright', { width: 3, depth: 3, height: 24 }, scene);
upright.position = new BABYLON.Vector3(-26, 15, -9);
upright.material = wood;
upright.physicsImpostor = new BABYLON.PhysicsImpostor(upright, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);

var arm = BABYLON.MeshBuilder.CreateBox('arm', { width: 40, depth: 1, height: 1 }, scene);
arm.position = new BABYLON.Vector3(-10, 27.5, -9);
arm.material = wood;
arm.physicsImpostor = new BABYLON.PhysicsImpostor(arm, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);

var nbPoints = 10;
myPoints = [];
for (var i = 0; i < nbPoints; i++) {
  myPoints.push(new BABYLON.Vector3(-8, 26.8, -9), new BABYLON.Vector3(-8, 26.5 - (22 * i) / nbPoints, -9));
}

//Create rope from extruded mesh
var nbPoints = 10;
myPoints = [];
for (var i = 0; i < nbPoints; i++) {
  myPoints.push(new BABYLON.Vector3(-8, 26.8, -9), new BABYLON.Vector3(-8, 26.5 - (22 * i) / nbPoints, -9));
}

myShape = [];
var radius = 0.2;
for (var i = 0; i < 2 * Math.PI + 0.1; i += Math.PI / 8) {
  myShape.push(new BABYLON.Vector3(Math.cos(i), Math.sin(i), 0).scale(radius));
}

var ropeMat = new BABYLON.StandardMaterial('rope', scene);
ropeMat.diffuseColor = new BABYLON.Color3(228 / 255, 108 / 255, 10 / 255);

//Create lines
var rope = BABYLON.MeshBuilder.ExtrudeShape('ext', { shape: myShape, path: myPoints }, scene);
rope.material = ropeMat;

rope.physicsImpostor = new BABYLON.PhysicsImpostor(rope, BABYLON.PhysicsImpostor.RopeImpostor, { mass: 0.1, shape: myShape, path: myPoints }, scene);
rope.physicsImpostor.velocityIterations = 10;
rope.physicsImpostor.positionIterations = 10;
rope.physicsImpostor.stiffness = 1;

rope.physicsImpostor.addHook(arm.physicsImpostor, 0, 1);

var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 5, segments: 12 }, scene);
sphere.position = new BABYLON.Vector3(-8, 5, -9);
sphere.material = blackMat;

sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 5 }, scene);

rope.physicsImpostor.addHook(sphere.physicsImpostor, 1, 1);

var impulseDirection = new BABYLON.Vector3(0, 0, -1);
var impulseMagnitude = 25;
sphere.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), sphere.getAbsolutePosition());

// Wall
var brickMass = 0.5;
var brickLength = 6;
var brickDepth = 3;
var brickHeight = brickLength * 0.5;
var numBricksLength = 6;
var numBricksHeight = 8;
var x0 = -numBricksLength * brickLength * 0.5;
var y = brickHeight * 0.5;
var x = 0;
var pos = new BABYLON.Vector3(x0, brickHeight * 0.5, 0);
for (var j = 0; j < numBricksHeight; j++) {
  var oddRow = j % 2 == 1;
  x = x0;
  var nRow = numBricksLength;
  if (oddRow) {
    x -= 0.25 * brickLength;
    nRow += 1;
  }
  for (var i = 0; i < nRow; i++) {
    var brickLengthCurrent = brickLength;
    var brickMassCurrent = brickMass;
    if (oddRow && (i == 0 || i == nRow - 1)) {
      brickLengthCurrent *= 0.5;
      brickMassCurrent *= 0.5;
    }

    var brick = BABYLON.MeshBuilder.CreateBox('', { width: brickLengthCurrent, height: brickHeight, depth: brickDepth }, scene);
    brick.position = new BABYLON.Vector3(x, y, 0);
    brick.material = new BABYLON.StandardMaterial('', scene);
    brick.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    brick.physicsImpostor = new BABYLON.PhysicsImpostor(brick, BABYLON.PhysicsImpostor.BoxImpostor, { mass: brickMass, friction: 0.3 }, scene);

    if (oddRow && (i == 0 || i == nRow - 2)) {
      x += 0.75 * brickLength;
    } else {
      x += brickLength;
    }
  }
  y += brickHeight;
}

return scene;
