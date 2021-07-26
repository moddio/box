console.log("hello");
const engine = new Engine();

box = null;

global.engine = engine;
global.isServer = false;

box.start();

// position is offest in noa
const unit = engine.createEntity("unit", { id: 1, position: [0, 0.5, 0] });
const player = engine.createEntity("player", { id: 1, position: [0, 0.5, 0] });

// dynamic  import using add component DEMO
const ent = new Entity();
ent.addComponent("ControlComponent");

// this line does not make sence for me and for javascript LOL
//player.setMainUnit(unit);
