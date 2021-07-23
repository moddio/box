// Engine
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

// Files
import "./utils/state.min.js";
import generateWorld from "./world.js";
import UnitManager from "./unitManager.js";
import PlayerManager from "./playerManager.js";
import ServerNetworkManager from "./networking/serverNetworkManager.js";

// we can't use engine as keyword class because is reserved for this.noa Engine
export class Engine {
  constructor(noa) {
    this.noa = noa;
    this.unitManager = new UnitManager(this.noa);
    this.playerManager = new PlayerManager(this.noa);
    !global.isServer
      ? (this.serverNetworkManager = new ServerNetworkManager(noa))
      : "";
  }
  start() {
    console.log("starting the this.noa engine...");

    generateWorld(this.noa);
    const scene = this.noa.rendering.getScene();
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );
    this.body = this.playerManager.createPlayer(1);
    this.noa.on("tick", () => this.engineStep.bind(this)());
  }
  engineStep() {
    !global.isServer ? this.serverNetworkManager.createSnapshot(this.body) : "";
  }
}

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
