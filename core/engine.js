// Engine
import * as BABYLON from "../node_modules/@babylonjs";
import { Engine as noaEngine } from "../node_modules/noa-engine";

// Files
import "./utils/state.min.js";
import generateWorld from "./world.js";
import { Unit } from "./unit.js";
import { Projectile } from "./projectile.js";
import { Player } from "./player.js";
import { config } from "../config/config.js";


import ServerNetworkComponent from "./components/network/serverNetworkComponent.js";



class Engine {
  constructor() {
    this.noa = new noaEngine(config);
    this.entities = {}
  }
  start() {
    console.log("starting the this.noa engine...");

    // determine if engine's being ran from server/client
    if (window == undefined) {
      console.log("engine's running on server")
      global.isServer = true;
      global.isClient = false;
    } else {
      console.log("engine's running on client")
      global.isServer = false;
      global.isClient = true;
    }

    generateWorld(this.noa);
    const scene = this.noa.rendering.getScene();
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );
    this.body = this.playerManager.createPlayer(1);
    this.noa.on("tick", () => this.engineStep.bind(this)());
  }
  loadComponents() {
    this.unit = new Unit();
    this.playerManager = new playerManager(this);
    // this.serverNetworkComponent = new ServerNetworkComponent(this);
  }
  
  engineStep() {
    if (global.isServer) {
      this.serverNetworkComponent.createSnapshot(this.body);
    } 
  }  

  createEntity(entityType, data) {
    switch(entityType) {
      case 'player':
        let player = new Player()
        this.entities[player.id()] = player
        break;
      case 'unit':
        let unit = new Unit()
        this.entities[unit.id()] = unit
        break;
      case 'item':
        let item = new Item()
        this.entities[item.id()] = item
        break;
      case 'projectile':
        let projectile = new Projectile()
        this.entities[projectile.id()] = projectile
        break;
    }
  }

  destroyEntity(entityId) {
    delete this.entities[entityId]
  }

}

export default Engine;

/**
 //player
const playerEvent = new Player(this.noa, player);
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
//blockSelector(this.noa, socket);
