// make this into a class

class ServerNetworkEvents {

  constructor() {
    io.on("connection", (socket) => {
         
      // create my own unit by default
      engine.myPlayer = engine.addEntity({
        type: "Player",
        isHuman: true,
        name: "john",
      });

      engine.myPlayer.createUnit();


      // socket.on("new-player", ({ id }) => {
      //   playersData.push({ id, socketID: socket.id });
      //   console.log("new player with the id", playersData, "is connected");
      // });
      // // Emit to connected players
      // socket.broadcast.emit("online-players", playersData);
      // // Emit to the new connected players
      // socket.emit("online-players", playersData);
    });
    
    // implement the below.
    // io.on("keyPress", data, function() {
    //   let player = BOX.Engine.players[socket.id];
    //   player.components['ControlComponent'].keyPress(key)
    // })
  }
}

// get rid of below
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