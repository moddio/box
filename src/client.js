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

// when player joins the game, create a unit, and assign that unit to that player.
// box.onEvent("playerJoin", function (player) {

let player = new box.Player({
  name: "john",
  player: box.Engine.noa.playerEntity,
});
let unit = new box.Unit({ owner: player.getMainUnit() });

// Asign the offset to the created body
unit.createBody([0, 0.5, 0], { type: "mesh" });

// Adding ticks to player component to be moved latter in engine js

var ents = box.Engine.noa.entities;

const test = ents.createComponent({
  name: "player",
  system: (dt, states) => {
    var p1 = ents.getPosition(noa.playerEntity);
    states.forEach((state) => {
      //console.log("this is the player comoponent ticks using noa", state);
      var p2 = ents.getPosition(state.__id);
      var dist = 0;
      for (var i = 0; i < 3; i++) dist += Math.abs(p1[i] - p2[i]);
      if (dist > 500) ents.deleteEntity(state.__id);
    });
  },
});
ents.addComponent(1, test);
