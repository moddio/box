const { Engine } = global;

const box = new Engine();

//box = null;
global.isServer = false;

box.start();
box.loadComponents();

//box.start();

// position is offest in noa
const unit = box.createEntity("unit", { id: 1, position: [0, 0.5, 0] });
const player = box.createEntity("player", { id: 1, position: [0, 0.5, 0] });

// dynamic  import using add component DEMO
//const ents = new Entity();
//ents.addComponent("ControlComponent");

// this line does not make sence for me and for javascript LOL
//player.setMainUnit(unit);
