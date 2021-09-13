const BABYLON = require('@babylonjs/core');

// Engine
//const { Engine: noaEngine } = global.isClient ? require('noa-engine') : false;
global.isClient ? require('./utils/state.min.js') : false;
const config = require('../config/config.json');

// Files
const generateWorld = require('./world.js');
const { Entity } = require('./entity.js');

const loadRegions = require('./components/map/regionLoader'); //need to remove - for now its regions for server
const map = require('../config/map/map.json');

class Engine extends Entity {
  constructor() {
    super({}, true);
    if (BOX.isClient) {
      const canvas = document.getElementById('renderCanvas'); // Get the canvas element
      const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

      // Add your code here matching the playground format

      const scene = new BABYLON.Scene(engine); //Call the createScene function

      // Register a render loop to repeatedly render the scene
      engine.runRenderLoop(function () {
        console.log('check render');
        scene.render();
      });

      // Watch for browser/canvas resize events
      window.addEventListener('resize', function () {
        engine.resize();
      });

      scene.createDefaultCameraOrLight(true, true, true);
      /**
           var box = BABYLON.MeshBuilder.CreateBox('box', {});
      var box2 = box.clone(box);
      box2.position.x = 20;
      box2.position.y = 20;
      scene.createDefaultEnvironment();
       */
      //this.noa = new noaEngine(config);
      // remove inputs component for player and movement component
      //this.noa.entities.deleteComponent('receivesInputs');
      //this.noa.entities.deleteComponent('movement');
    }
    this.entities = {};
    this.clients = {};
    this.myPlayer;
    this.currentTime = 0;
  }

  start() {
    var self = this;

    console.log('starting the noa engine...');

    let scene = {};

    if (BOX.isClient) {
      generateWorld();

      //scene = this.noa.rendering.getScene();

      // this.addComponent('NetworkComponent');

      //this.noa.camera.sensitivityX = 5;
      //this.noa.camera.sensitivityY = 5;

      /*this.noa.on('tick', () => {
        // Update engine time on each tick
        self.engineStep();
      });*/
      this.addComponent('ClientNetworkComponent');
    } else {
      loadRegions(map);
      this.addComponent('ServerNetworkComponent');
    }
  }

  loadMap(mapData) {}

  engineStep() {
    this.tickStart = Date.now();
    // Call player ticks

    for (let id in this.entities) {
      let entity = this.entities[id];
      entity.tick();
    }

    this.tickDelta = Date.now() - this.tickStart;
    this.currentTime += this.tickDelta;
  }

  getEntity(id) {
    let entityByID;
    Object.values(this.entities).forEach(entity => {
      if (entity.id == id) entityByID = entity;
    });
    return entityByID;
  }

  getGameState() {
    state = [];
    for (let id in this.entities) {
      let entity = this.entities[id];
      state.push(entity.data);
    }

    return state;
  }

  getEntityByName(name) {
    let entityByName;
    Object.values(this.entities).forEach(entity => {
      if (entity.name == name) entityByName = entity;
    });
    return entityByName;
  }

  getEntityByNoaID(id) {
    let entityByNoaID;
    Object.values(this.entities).forEach(entity => {
      if (entity.noaEntityId == id) entityByNoaID = entity;
    });

    return entityByNoaID;
  }

  getEntityBySocketID(id) {
    let entityBySocketID;
    Object.values(this.entities).forEach(entity => {
      if (entity.socketID == id) entityBySocketID = entity;
    });
    return entityBySocketID;
  }

  addEntity(data) {
    let entityType = data.type;
    if (entityType) {
      let entity = new BOX[entityType](data);
      return entity;
    } else {
      error('entity type not defined');
    }
  }

  removeEntity(id) {
    if (BOX.isClient) {
      //this.noa.entities.deleteEntity(this.getEntity(id).mainUnit.noaEntityId);
      delete this.entities[id];
    } else {
      let unitID = this.entities[id].mainUnit.id;
      // delete the player entity
      delete this.entities[id];
      // delete the unit entities
      delete this.entities[unitID];
    }
  }
}

/**
 //player
const playerEvent = new Player(noa, player);
// init event listener
playerEvent.playerEvent();
 */

/*

// Client side server logic for socket
export const socket = io("http://localhost:3000");
socket.on("connect", () => {
  // Logging out offline players
  socket.on("removePlayer", removePlayerEvent);
  // Listening for player movement change
  socket.on("players", playersEvent);
  // Listening for new block creation
  socket.on("createBlock", createBlockEvent);
  // Listening for new block deletion
  socket.on("removeBlock", removeBlockEvent);
  // Emit your your ID and your initial position to the server
  socket.emit("players", playersDataEvent(socket.id, [0, 10, 0]));
  socket.on("ballshoot", (position) => {
    console.log("ball shoot data", position);
    playerEvent.playerShootBall(position);
  });
});
**/

// Event listener for input of the user (createBlock, edit, movement)
//blockSelector(noa, socket);

module.exports = { Engine };
