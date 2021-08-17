var playersData = [];

const serverNetworking = (io) => {
  io.on("connection", (socket) => {
    socket.on("new-player", ({ id }) => {
      playersData.push({ id, socketID: socket.id });
      console.log("new player with the id", playersData, "is connected");
    });
    // Emit to connected players
    socket.broadcast.emit("online-players", playersData);
    // Emit to the new connected players
    socket.emit("online-players", playersData);
  });
};

module.exports = { serverNetworking };
