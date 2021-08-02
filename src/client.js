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

// when player joins the game, create a unit, and assign that unit to that player.
// box.onEvent("playerJoin", function (player) {

console.log("player has joined the game");

let player = new box.Player({
  name: "john",
  player: box.Engine.noa.playerEntity,
});
let unit = new box.Unit({ owner: player.getMainUnit() });

// Asign the offset to the created body
unit.createBody([0, 0.5, 0]);
