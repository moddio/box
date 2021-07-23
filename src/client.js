import { Engine } from "../core/engine";

// global variables
global.isServer = false;

export const engine = new Engine();
engine.setAsClient();
engine.start();
