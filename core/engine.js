// Engine
import * as BABYLON from "@babylonjs/core";
import { Engine as noaEngine } from "noa-engine";
import { Mesh as noaMesh } from "@babylonjs/core/Meshes/mesh";
import { config } from "../config/config";

// Files
import "./utils/state.min.js";
import generateWorld from "./world.js";
import { Entity } from "./entity.js";

export class Engine extends Entity {
  constructor() {
    super();
    this.noa = new noaEngine(config);
    // this.noa.inputs.unbind("forward");
    // this.noa.inputs.unbind("left");
    // this.noa.inputs.unbind("backward");
    // this.noa.inputs.unbind("right");

    
    this.Mesh = noaMesh;
    this.entities = {};

    if (box.isClient) {      

      // create a component inside Noa that will call boxEntitiy.tick()
      this.boxTickComponentName = this.noa.entities.createComponent({
        system: boxTick() // calls boxEntity
      });

      // noa create a new unit immeidately after noa engine is initiated, therefore, create player & entity inside box engine as well,
      // and make references to the noa engine's entity
      this.myPlayer = new box.Player({
                              name: "john"
                            });
      let unit = new box.Unit({ owner: player });
      unit.noaEntityId = this.noa.playerEntity;
      
      // Asign the offset to the created body
      // unit.createBody([0, 0.5, 0]);
      
      const mesh = this.Mesh.CreateBox("player-mesh", 1);
      this.noa.entities.addComponent(
        unit.noaEntityId,
        this.noa.entities.names.mesh,
        {
          mesh,
          offset,
        }
      );
    }

    this.noa.on("tick", function() {
      this.engineStep();
    })
    
  }

  /*
    connect to the game server. once successful, create my player's entity
  */
  start() {
    console.log("starting the noa engine...");

    // Generate the world
    generateWorld();
    const scene = this.noa.rendering.getScene();

    // Enable physics in the scene
    scene.enablePhysics(
      new BABYLON.Vector3(0, -9.8, 0),
      new BABYLON.AmmoJSPlugin()
    );
  }
  loadMap(mapData) {}
  engineStep() {
    if (global.isServer) {
      this.serverNetworkComponent.createSnapshot(this.body);
    }
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
