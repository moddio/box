var serverNetworkEvent = require("./serverNetworkEvents");

class ServerNetworkManager {
  constructor(engine) {
    this.engine = engine;
  }

  queueData() {}

  createSnapshot() {}

  streamSnapshot() {
    for (let elem in this.snapshot) {
      // Get the position of each entity
      noa.entities.getPosition(this.snapshot[elem].id);
      if (this.snapshot[elem].id === 1) {
        // if the id is the player entity id
        let playerPosition = noa.entities.getPosition(1);
        for (let elem in playerPosition) {
          // check if the player has moved
          if (playerPositionChecker[elem] !== playerPosition[elem]) {
            playerPositionChecker = [...playerPosition];
            // update the snapshot with new player position
            this.snapshot[0].position = [...playerPosition];
            console.log("the player of the entity with id === 1 has moved");
          }
        }
      }
    }
  }
}

module.exports = ServerNetworkManager;
