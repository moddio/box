import { io } from "socket.io-client";

let mapData = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
];
let scriptData = {};

console.log("hello", box.isClient);

box.Engine.start();

// remove inputs component for player and movement component
box.Engine.noa.entities.deleteComponent("receivesInputs");
box.Engine.noa.entities.deleteComponent("movement");

console.log(box.Engine.noa);

/**
 
loading map data and loadScript
Box.loadMap(mapData);
Box.loadScript(scriptData);

 */

console.log("testing box mapData", box.mapData);

// Testing the movement friction

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
