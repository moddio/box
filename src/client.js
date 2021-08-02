let mapData = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
];
let scriptData = {};

import * as Box from 'box.js';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const engine = new Box.Engine();

let playerA = new Box.Player({name: "john"}); // first created player is my player
// let playerB = new Box.Player({name: "jef"});
// let playerC = new Box.Player({name: "corbin"});
let unit = new Box.Unit({owner: playerA}); // if this is playerA's first unit, then this unit automatically becomes playerA's main unit.

/**
 
loading map data and loadScript
Box.loadMap(mapData);
Box.loadScript(scriptData);

 */
