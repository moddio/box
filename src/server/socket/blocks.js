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
  // Brodacast the blocks to all logged in user
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

module.exports = { createBlockSocket, removeBlockSocket, returnCurrentBlocks };
