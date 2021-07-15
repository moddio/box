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

module.exports = { playersSocket };
