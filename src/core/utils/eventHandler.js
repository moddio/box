import { diamond, gold, tree, dirt } from "./textures";

// firball import
//import { shootBouncyBall } from "../fireball/fireball";

//Socket import
import { playersDataEvent } from "../socket/players";
import { io } from "socket.io-client";

const eventPlayer = (noa) => {
  const socket = io("http://localhost:3000");

  //Event handlers
  const waterEvent = document.querySelector(".game_build-water");
  const grassEvent = document.querySelector(".game_build-blocks");
  const pauseEvent = document.querySelector(".game_build-pause");
  const goldEvent = document.querySelector(".game_build-gold");
  const diamondEvent = document.querySelector(".game_build-diamond");
  const dirtEvent = document.querySelector(".game_build-dirt");

  //Register texture in memory
  noa.registry.registerMaterial("tree", null, tree);
  noa.registry.registerMaterial("dirt", null, dirt);
  noa.registry.registerMaterial("gold", null, gold);
  noa.registry.registerMaterial("diamond", null, diamond);

  // Save texture inside register Block
  const waterID = noa.registry.registerBlock(1, { material: "water" });
  const grassID = noa.registry.registerBlock(2, { material: "grass" });
  const goldID = noa.registry.registerBlock(3, { material: "gold" });
  const diamondID = noa.registry.registerBlock(4, { material: "diamond" });
  const dirtID = noa.registry.registerBlock(5, { material: "dirt" });

  // Player Event on keyborad or mouse click
  dirtEvent.addEventListener("click", () => {
    noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        const pos = noa.targetedBlock.adjacent;
        noa.setBlock(dirtID, pos[0], pos[1], pos[2]);
        socket.emit("createBlock", {
          data: {
            id: "dirt",
            position: [pos[0], pos[1], pos[2]],
          },
        });
      }
    });
  });
  diamondEvent.addEventListener("click", () => {
    noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        const pos = noa.targetedBlock.adjacent;
        noa.setBlock(diamondID, pos[0], pos[1], pos[2]);
        socket.emit("createBlock", {
          data: {
            id: "diamond",
            position: [pos[0], pos[1], pos[2]],
          },
        });
      }
    });
  });
  goldEvent.addEventListener("click", () => {
    noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        const pos = noa.targetedBlock.adjacent;
        noa.setBlock(goldID, pos[0], pos[1], pos[2]);
        socket.emit("createBlock", {
          data: {
            id: "gold",
            position: [pos[0], pos[1], pos[2]],
          },
        });
      }
    });
  });
  waterEvent.addEventListener("click", () => {
    noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        const pos = noa.targetedBlock.adjacent;
        noa.setBlock(waterID, pos[0], pos[1], pos[2]);

        socket.emit("createBlock", {
          data: {
            id: "water",
            position: [pos[0], pos[1], pos[2]],
          },
        });
      }
    });
  });
  grassEvent.addEventListener("click", () => {
    noa.inputs.down.on("fire", () => {
      if (noa.targetedBlock) {
        const pos = noa.targetedBlock.adjacent;
        noa.setBlock(grassID, pos[0], pos[1], pos[2]);
        socket.emit("createBlock", {
          data: {
            id: "grass",
            position: [pos[0], pos[1], pos[2]],
          },
        });
      }
    });
  });
  window.addEventListener("keypress", () => {
    // Get player Position
    var ents = noa.entities;
    var playPos = ents.getPosition(noa.playerEntity);
    // Emit your data to to the server socket
    socket.emit(
      "players",
      playersDataEvent(socket.id, [playPos[0], playPos[1] + 0.5, playPos[2]])
    );
    return;
  });
  // Pause event
  let paused = false;
  pauseEvent.addEventListener("click", () => {
    paused = !paused;
    noa.setPaused(paused);
  });
  noa.inputs.down.on("alt-fire", () => {
    if (noa.targetedBlock) {
      let pos = noa.targetedBlock.position;
      noa.setBlock(0, pos[0], pos[1], pos[2]);
      console.log("fired");
      socket.emit("removeBlock", {
        data: { position: [pos[0], pos[1], pos[2]] },
      });
    }
  });
};

export default eventPlayer;
