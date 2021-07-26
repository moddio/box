import { engine } from "../core/engine";

global.engine = engine;
console.log("engine", engine.noa.camera);
engine.loadComponents();
engine.start();
