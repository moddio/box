import { io } from "socket.io-client";

let mapData = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
];
let scriptData = {};

console.log("hello", box.isClient);

box.Engine.start();

/**
 
loading map data and loadScript
Box.loadMap(mapData);
Box.loadScript(scriptData);

 */

console.log("testing box mapData", box.mapData);

// Testing the movement friction
setTimeout(() => {
  var ents = box.Engine.noa.entities;
  var radius = 0.2;

  let ballMesh = box.Engine.Mesh.CreateSphere(
    "testOBJ",
    2,
    2,
    box.Engine.noa.rendering.getScene()
  );

  // syntatic sugar for creating a default entity
  var playPos = ents.getPosition(box.Engine.noa.playerEntity);
  var pos = [playPos[0], playPos[1] + 0.5, playPos[2]];

  var mesh = ballMesh.createInstance("ball_instance");
  var meshOffset = [0, 0.5, 0];

  var id = box.Engine.noa.entities.add(
    pos,
    0.1,
    0.1, // required
    mesh,
    meshOffset,
    true
  );

  var body = ents.getPhysicsBody(id);
  window.addEventListener("keypress", (e) => {
    if (e.key === "t") {
      body.applyImpulse([1, 3, 4]);
    }
  });
  body.restitution = 0.8;
  body.friction = 0.7;
  var dir = noa.camera.getDirection();
  var imp = [];
  for (var i = 0; i < 3; i++) imp[i] = 5 * dir[i];
  imp[1] += 1;
  body.applyImpulse(imp);
}, 1000);

// when player joins the game, create a unit, and assign that unit to that player.
// box.onEvent("playerJoin", function (player) {

console.log("player has joined the game");

// Client side server logic for socket
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("my socket id is", socket.id);
});

socket.emit("new-player", { playerID: Math.random() });

// when player joins the game, create a unit, and assign that unit to that player.
// box.onEvent("playerJoin", function (player) {

// Adding ticks to player component

// creating tick inside entity of the player
