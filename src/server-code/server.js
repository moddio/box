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
let build = [];

io.on("connection", (socket) => {
  // Emit build for new players comming import
  socket.emit("build", { build });

  // Listen for position change or new player added
  socket.on("players", ({ name: playerName, position }) => {
    socket.on("disconnect", () => {
      for (let i = 0; i < players.length; i++) {
        if (players[i].name === playerName) {
          players.splice(i, 1);
        }
      }
      socket.broadcast.emit("removePlayer", playerName);
      console.log(`player disconnected ${playerName} / players array `);
    });
    const idPlayer = (element) => element.name === playerName;
    const indx = players.findIndex(idPlayer);
    indx !== -1
      ? (players[indx].position = position)
      : players.push({
          name: playerName,
          position: position,
        });
    // Emit is there for new players joining the session &&  Brodcast is there for existing players
    socket.emit("players", { data: players });
    socket.broadcast.emit("players", { data: players });

    console.log("players online", players);
  });

  // Listen for build change
  socket.on("build", ({ data }) => {
    build = [...build, data];
    // Emit is there for new players joining the session &&  Brodcast is there for existing players
    socket.emit("build", { build });
    socket.broadcast.emit("build", { build });

    console.log("buildData", build);
  });

  socket.on("removeBuild", ({ data: { water } }) => {
    for (var i = 0; i < build.length; i++) {
      if (
        water[0] === build[i].water[0] &&
        water[1] === build[i].water[1] &&
        water[2] === build[i].water[2]
      ) {
        build.splice(i, 1);
      }
    }
    console.log("remove build", build);
    socket.emit("removeBuild", water);
    socket.broadcast.emit("removeBuild", water);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
