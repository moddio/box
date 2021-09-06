// Engine
import { Engine as noaEngine } from 'noa-engine';
import config from '../config/config.json';

// Files
import './utils/state.min.js';
import generateWorld from './world.js';
import { Entity } from './entity.js';

export class Engine extends Entity {
  constructor() {
    super({}, true);

    if (BOX.isClient) {
      this.noa = new noaEngine(config);
    }
    
    this.entities = {};
    this.clients = {};
    this.myPlayer;
    this.currentTime = 0;

    /**
    Length of a tick in milliseconds. The denominator is your desired framerate.
    e.g. 1000 / 20 = 20 fps,  1000 / 60 = 60 fps
    */
    this.tickLengthMs = 1000 / 20

    /* gameLoop related variables */
    // timestamp of each loop
    this.previousTick = Date.now()
    // number of times gameLoop gets called
    this.actualTicks = 0

    // remove inputs component for player and movement component
    this.noa.entities.deleteComponent('receivesInputs');
    this.noa.entities.deleteComponent('movement');
  }

  start() {
    var self = this;

    console.log('starting the noa engine...');

    // Generate the world
    generateWorld();
    const scene = this.noa.rendering.getScene();

    console.log('logging out the container', this.noa.container);

    // this.addComponent("NetworkComponent")

    // MOVE THIS TO CONTROLCOMPONENT OR SOMEWHERE ELSE BUT NOT HERE!!
    this.noa.camera.sensitivityX = 5;
    this.noa.camera.sensitivityY = 5;

    if (BOX.isServer) {
      var now = Date.now()
      this.actualTicks++
      if (this.previousTick + this.tickLengthMs <= now) {
        var delta = (now - this.previousTick) / 1000
        this.previousTick = now

        self.engineStep();

        console.log('delta', delta, '(target: ' + this.tickLengthMs +' ms)', 'node ticks', this.actualTicks)
        this.actualTicks = 0
      }

      if (Date.now() - this.previousTick < this.tickLengthMs - 16) {
        setTimeout(gameLoop)
      } else {
        setImmediate(gameLoop)
      }
    } else if (BOX.isClient) {
      this.noa.on('tick', () => {
        // Update engine time on each tick
        self.engineStep();
      });
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
    let entityByNoaID
    Object.values(this.entities).forEach(entity => {
      if (entity.noaEntityId == id)
      entityByNoaID = entity;
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
    if (BOX.isClient) {
      this.noa.entities.deleteEntity(noaID);
    }
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
