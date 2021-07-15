let blocks = [];

// return  block data
const returnCurrentBlocks = () => ({
  blocks,
});

const createBlockSocket = (data, socket) => {
  blocks = [...blocks, data];
  // Emit Blocks for new player joining the session
  socket.emit("createBlock", { blocks });
  // Brodacast the blocks to all logged in user
  socket.broadcast.emit("createBlock", { blocks });

  console.log("createBlock", blocks);
};

const removeBlockSocket = (water, socket) => {
  for (var i = 0; i < blocks.length; i++) {
    // Removing water blcoks from the data (blocks)
    if (
      water[0] === blocks[i].water[0] &&
      water[1] === blocks[i].water[1] &&
      water[2] === blocks[i].water[2]
    ) {
      blocks.splice(i, 1);
    }
  }
  console.log("remove blocks", blocks);
  socket.emit("removeBlock", water);
  // Brodcast the new blocks data to logged in user
  socket.broadcast.emit("removeBlock", water);
};

module.exports = { createBlockSocket, removeBlockSocket, returnCurrentBlocks };
