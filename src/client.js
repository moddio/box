import { Engine } from "../core/engine";
import { Entity } from "../core/entity";

const engine = new Engine();

global.engine = engine;
global.isServer = "false";

engine.start();
engine.loadComponents();

// position is offest in noa
const unit = engine.createEntity("unit", { id: 1, position: [0, 0.5, 0] });
const player = engine.createEntity("player", { id: 1, position: [0, 0.5, 0] });

// dynamic  import using add component DEMO
const ents = new Entity();
ents.addComponent("ControlComponent");

// this line does not make sence for me and for javascript LOL
//player.setMainUnit(unit);
