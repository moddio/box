const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a player connected");
  socket.on("disconnect", () => {
    console.log("player disconnected");
  });
  socket.on("player", (msg) => {
    console.log("player login: " + msg);
  });
  socket.emit("All players data", { player1: [1, 0, 0], player2: [] });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
