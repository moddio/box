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
<<<<<<< HEAD
=======
let build = [];
>>>>>>> c210e1d8be5145a4a9e605113991421270d7683f

io.on("connection", (socket) => {
  // Emit player data
  socket.emit("players", { data: players });
  socket.broadcast.emit("players", { data: players });

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

    socket.broadcast.emit("players", { data: players });

    console.log("players online", players);
  });
<<<<<<< HEAD
=======

  socket.on("build", ({ data }) => {
    build = [...build, data];
    console.log("buildData", build);
    socket.broadcast.emit("getbuild", { build });
  });
>>>>>>> c210e1d8be5145a4a9e605113991421270d7683f
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
