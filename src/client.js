import { Engine } from "../core/engine";

var engine = Engine;
console.log("engine", engine.noa.camera);
engine.loadComponents();
engine.createMap(mapArray)
engine.start();


// gamee code
var player = engine.createEntity("player", {name: "me"})
var unit = engine.createEntity("unit", {position: [1,2,3]})
player.setMainUnit(unit)
