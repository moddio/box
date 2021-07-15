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

// removed blocks position [x,y,z]
const removedBlocks = [];

// socket logic
const { playersSocket } = require("./socket/players.js");
const {
  createBlockSocket,
  removeBlockSocket,
  returnCurrentBlocks,
} = require("./socket/blocks.js");

io.on("connection", (socket) => {
  // Emit map state to new logged in user
  socket.emit("mapBlockState", removedBlocks);
  // Emit creation of block data to new user
  socket.emit("createBlock", returnCurrentBlocks());
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
    removeBlockSocket(position, socket);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
