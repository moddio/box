class ServerNetworkComponent {
  constructor(noa) {
    this.noa = noa;
    this.snapshot = [{ id: 1, position: [] }];
    this.rotation = 0;
  }

  // queueData() {}

  //streamSnapshot() {}

  createSnapshot(body) {
    // rotation will be moved in playerManager (Just to keep track of the code logic)
    let playerPositionChecker = [...this.noa.entities.getPosition(1)];
    let current = this.noa.camera.getDirection()[0];
    let persistanceRot = 0.01;
    if (current > 0 && this.rotation !== current) {
      body.rotatePOV(0, persistanceRot + 0.01, 0);
    }
    if (current < 0 && this.rotation !== current) {
      body.rotatePOV(0, -persistanceRot - 0.01, 0);
    }
    this.rotation = current;
    // rotation will be moved in playerManager
    for (let elem in this.snapshot) {
      // Get the position of each entity
      this.noa.entities.getPosition(this.snapshot[elem].id);
      if (this.snapshot[elem].id === 1) {
        // if the id is the player entity id
        let playerPosition = this.noa.entities.getPosition(1);
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

export default ServerNetworkComponent;
