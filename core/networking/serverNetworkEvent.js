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

module.exports = {
  createBlockSocket,
  removeBlockSocket,
  returnCurrentBlocks,
  playersSocket,
};
