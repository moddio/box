// Engine
import * as BABYLON from "@babylonjs/core";
import PlayerManager from "./playerManager.js";
import "@babylonjs/core/Meshes/Builders/boxBuilder";

// Files
import "./utils/state.min.js";
import generateWorld from "./world.js";
import UnitManager from "./unitManager.js";

// we can't use engine as keyword class because is reserved for this.noa Engine
export class Engine {
  constructor(noa) {
    this.noa = noa;
    this.unitManager = new UnitManager(this.noa);
    this.playerManager = new PlayerManager(this.noa);
    this.body;
    this.snapshot = [{ id: 1, position: [] }];
    this.rotation = 0;
  }
  start() {
    console.log("isServer", global.isServer);
    console.log("starting the this.noa engine...");
    console.log("noa lookup", this.noa);

    generateWorld(this.noa);
    const scene = this.noa.rendering.getScene();
    // Enable physics in the scene
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );
    this.body = this.playerManager.createPlayer(1);

    this.noa.on("tick", () => this.engineStep.bind(this)());
  }
  engineStep() {
    let playerPositionChecker = [...this.noa.entities.getPosition(1)];
    let current = this.noa.camera.getDirection()[0];
    let persistanceRot = 0.01;
    if (current > 0 && this.rotation !== current) {
      this.body.rotatePOV(0, persistanceRot + 0.01, 0);
    }
    if (current < 0 && this.rotation !== current) {
      this.body.rotatePOV(0, -persistanceRot - 0.01, 0);
    }
    this.rotation = current;
    for (let elem in this.snapshot) {
      // Get the position of each entity
      this.noa.entities.getPosition(this.snapshot[elem].id);
      if (this.snapshot[elem].id === 1) {
        // if the id is the player entity id
        let playerPosition = this.noa.entities.getPosition(1);
        for (let elem in playerPosition) {
          // check if the player has moved
          if (playerPositionChecker[elem] !== playerPosition[elem]) {
            playerPositionChecker = [...playerPosition];
            // update the snapshot with new player position
            this.snapshot[0].position = [...playerPosition];
            console.log("the player of the entity with id === 1 has moved");
          }
        }
      }
    }
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
