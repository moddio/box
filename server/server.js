// removed blocks position [x,y,z]
const removedBlocks = [];

// socket logic
const {
  createBlockSocket,
  removeBlockSocket,
  returnCurrentBlocks,
  playersSocket,
} = require("../core/networking/serverNetworkEvent");

io.on("connection", (socket) => {
  // to be replace with callback
  setTimeout(() => {
    // Emit map state to new logged in user
    socket.emit("mapBlockState", removedBlocks);
    // Emit creation of block data to new user
    socket.emit("createBlock", returnCurrentBlocks());
  }, 10000);
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
    removeBlockSocket(position, socket, removedBlocks);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
