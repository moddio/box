// Engine
import * as BABYLON from "@babylonjs/core";
import { Engine as noaEngine } from "noa-engine";
import { Mesh as noaMesh } from "@babylonjs/core/Meshes/mesh";
import config from "../config/config.json";
import { movementComp } from "../core/components/movement";

import SaveMapButton from "./components/editor/ui/mapSaver";
import developerModeButton from "./components/editor/ui/developerMode";

// Files
import "./utils/state.min.js";
import generateWorld from "./world.js";
import { Entity } from "./entity.js";

export class Engine extends Entity {
  constructor() {
    super();
    this.noa = new noaEngine(config);
    this.Mesh = noaMesh;
    this.entities = [];
    this.myPlayer;
    this.engineTime = 0;
    this.numberOfTicks = 0;
  }
  start() {
    console.log("starting the noa engine...");

    // Generate the world
    generateWorld();

    const scene = this.noa.rendering.getScene();

    this.noa.camera.sensitivityX = 5;
    this.noa.camera.sensitivityY = 5;

    // Enable physics in the scene
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );

    BOX.inputs.bind("move-up", "W", "<up>");
    BOX.inputs.bind("move-left", "A", "<left>");
    BOX.inputs.bind("move-down", "S", "<up>");
    BOX.inputs.bind("move-right", "D", "<left>");
    BOX.inputs.bind("jump", "<space>");
    BOX.inputs.bind("change-material", "P", "<left>");
    BOX.inputs.bind("add-block", "L", "<left>");
    BOX.inputs.bind("remove-block", "K", "<left>");

    // setting the player Unit as main unit
    this.myPlayer = new BOX.Player({
      name: "john",
    });
    this.myPlayer.createUnit();

    // run unit ticks
    //unit.tick();
    developerModeButton();
  }

  loadMap(mapData) {}

  engineStep() {
    this.noa.on("tick", () => {
      // Update engine time on each tick
      this.engineTime = Math.round(new Date() - this.startTime);
      this.numberOfTicks++;

      //Loop over all entities
      for (let elem in this.entities) {
        // Call ticks only on player for now (Because it has movement)
        if (this.entities[elem] === 1) {
          this.body = this.noa.entities.getPhysicsBody(1);
          console.log("this is the body", this.noa.entities);
          this.mesh = this.noa.entities.getMeshData(1).mesh;
          this.tick();
        }
        console.log(this.entities[elem]);
      }
    });
  }

  destroyEntity(entityId) {
    delete this.entities[entityId];
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
