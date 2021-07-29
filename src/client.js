let mapData = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9], 
  [1, 2, 3, 4, 5, 6, 7, 8, 9], 
  [1, 2, 3, 4, 5, 6, 7, 8, 9]
]
let scriptData = {}

box.start();
box.loadMap(mapData);
box.loadScript(scriptData);

// when player joins the game, create a unit, and assign that unit to that player.
// box.onEvent("playerJoin", function (player) {
  console.log("player has joined the game");
  const unit = box.createEntity("unit", { position: [0, 0.5, 0] });
  const player = box.createEntity("player");
  player.setMainUnit(unit);
// })

// box.onEvent("bulletHitsUnit", function (bullet, unit) {
//   unit.components["attribute"].decrementAttribute("hp", bullet.damage);
// })