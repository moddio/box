//const body = unitManager.shootBall();
// unit init
//const unit = new Unit(noa, body);
//setTimeout(() => unit.moveBall(), 10000);

export class ControlComponent {
  constructor(player) {
    this.player = player;
  }

  mouseMove() {
    // if this is client and for my player, update unit's rotation upon mousemove.
    this.player.getMainUnit();
  }

  keyPress(key) {
    if (engine.isClient) {
      switch (key) {
        case "h":
          let arr = this.unitManager.shootBall();
          this.body = arr[0];
          socket.emit("ballshoot", { position: arr[1] });
      }
    } else if (engine.isServer) {
      switch (key) {
        case "h":
          this.body = engine.createEntity("projectile", {
            position: position,
            velocity: [1, 2, 3],
          });
      }
    }
  }
}

export default ControlComponent;
