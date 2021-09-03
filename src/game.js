var engine = BOX.Engine;
engine.start();

// connect to the game server e.g. "localhost:1337"

let options = {
  serverAddress: "localhost:1337",
  playerName: "john" // <- this is my player's name
}

BOX.Engine.components['NetworkComponent'].connectToServer(options, function(data) {
  
  // // create my own unit by default
  // engine.myPlayer = engine.addEntity({
  //   type: "Player",
  //   isHuman: true,
  //   name: "john",
  // });

  // engine.myPlayer.createUnit();

});