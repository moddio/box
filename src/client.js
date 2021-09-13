global.isClient = true;
require('../core/loader');
require('../core/box');

let engine = new BOX.Engine();
BOX.Engine = engine;

engine.start();
