// Engine
const { Engine: noaEngine } = require('noa-engine');
const config = require('../config/config.json');

// Files
require('./utils/state.min.js');
const generateWorld = require('./world.js');
const { Entity } = require('./entity.js');

class Engine extends Entity {
  constructor() {
    super({}, true);
    if (BOX.isClient) {
      this.noa = new noaEngine(config);
      // remove inputs component for player and movement component
      this.noa.entities.deleteComponent('receivesInputs');
      this.noa.entities.deleteComponent('movement');
    }
    this.entities = {};
    this.clients = {};
    this.myPlayer;
    this.currentTime = 0;
  }

  start() {
    var self = this;

    console.log('starting the noa engine...');

    generateWorld();
    const scene = this.noa.rendering.getScene();

    // this.addComponent('NetworkComponent');

    this.noa.camera.sensitivityX = 5;
    this.noa.camera.sensitivityY = 5;

    this.noa.on('tick', () => {
      // Update engine time on each tick
      self.engineStep();
    });
    //this.addComponent('NetworkComponent');
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
    return;
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

  addEntity(data) {
    let entityType = data.type;
    if (entityType) {
      let entity = new BOX[entityType](data);
      return entity;
    } else {
      error('entity type not defined');
    }
  }

  removeEntity(id, noaID) {
    this.noa.entities.deleteEntity(noaID);
    delete this.entityIds[id];
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
