let mapData = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
];
let scriptData = {};

const { Box } = box;

Box.start();

/**
 
loading map data and loadScript
Box.loadMap(mapData);
Box.loadScript(scriptData);

 */

// when player joins the game, create a unit, and assign that unit to that player.
// box.onEvent("playerJoin", function (player) {
console.log("player has joined the game");
const unit = Box.createEntity("unit", { id: 1, position: [0, 0.5, 0] });
const player = Box.createEntity("player");

// this line does not make sence for me and for javascript LOL
//player.setMainUnit(unit);
