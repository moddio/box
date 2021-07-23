import { Engine as noaEngine } from "noa-engine";
import { Engine } from "../core/engine";
import { config } from "../core/config/config";

// global variables
global.isServer = false;

const noa = new noaEngine(config);
console.log("isServer", isServer);
console.log("this is a noa object", noa);
const engine = new Engine(noa);
engine.start();
