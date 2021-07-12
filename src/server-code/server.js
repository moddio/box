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

const players = [];

io.on("connection", (socket) => {
  // emit player data
  socket.emit("players", { data: players });

  // listen for position change or new player added
  socket.on("players", ({ name: playerName, position }) => {
    const idPlayer = (element) => element.name === playerName;
    const indx = players.findIndex(idPlayer);
    indx !== -1
      ? (players[indx].position = position)
      : players.push({
          name: playerName,
          position: position,
        });

    console.log("players online", players);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
