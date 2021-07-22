// express and http
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
let blocks = [];

// return  block data
const returnCurrentBlocks = () => ({
  blocks,
});

const createBlockSocket = (data, socket) => {
  console.log("datablock", data);
  blocks = [...blocks, data];
  // Emit Blocks for new player joining the session
  socket.emit("createBlock", { blocks });
  // Brodacast the blocks to all logged in user5
  socket.broadcast.emit("createBlock", { blocks });

  console.log("createBlock", blocks);
};

const removeBlockSocket = (position, socket) => {
  for (var i = 0; i < blocks.length; i++) {
    // Removing position blcoks from the data (blocks)
    if (
      position[0] === blocks[i].position[0] &&
      position[1] === blocks[i].position[1] &&
      position[2] === blocks[i].position[2]
    ) {
      blocks.splice(i, 1);
    }
  }
  console.log("remove blocks", blocks);
  socket.emit("removeBlock", position);
  // Brodcast the new blocks data to logged in user
  socket.broadcast.emit("removeBlock", position);
};
const players = [];

const playersSocket = (playerID, position, socket) => {
  socket.on("disconnect", () => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].ID === playerID) {
        players.splice(i, 1);
      }
    }
    socket.broadcast.emit("removePlayer", playerID);
    console.log(`player disconnected ${playerID} / players array `);
  });

  const idPlayer = (element) => element.ID === playerID;
  const indx = players.findIndex(idPlayer);
  indx !== -1
    ? (players[indx].position = position)
    : players.push({
        ID: playerID,
        position: position,
      });
  // Emit is there for new players joining the session &&  Brodcast is there for existing players
  socket.emit("players", { data: players });
  socket.broadcast.emit("players", { data: players });

  console.log("players online", players);
};

// removed blocks position [x,y,z]
const removedBlocks = [];

io.on("connection", (socket) => {
  // to be replace with callback
  setTimeout(() => {
    // Emit map state to new logged in user
    socket.emit("mapBlockState", removedBlocks);
    // Emit creation of block data to new user
    socket.emit("createBlock", returnCurrentBlocks());
  }, 10000);
  // Listen for position change or new player added
  socket.on("players", ({ ID: playerID, position }) => {
    playersSocket(playerID, position, socket);
  });
  // Listen for blocks creation
  socket.on("createBlock", ({ data }) => {
    createBlockSocket(data, socket);
  });
  // Listen for blocks removal
  socket.on("removeBlock", ({ data: { position } }) => {
    removedBlocks.push(position);
    removeBlockSocket(position, socket, removedBlocks);
  });
  //shoot ball
  socket.on("ballshoot", ({ position }) => {
    socket.broadcast.emit("ballshoot", position);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
