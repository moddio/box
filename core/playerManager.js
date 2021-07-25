import { Mesh } from "@babylonjs/core/Meshes/mesh";

class PlayerManager {
  constructor(engine) {
    this.engine = engine;
  }
  createPlayer(id) {
    // Player Setup
    let player = id;
    const mesh = Mesh.CreateBox("player-mesh", 1);
    const a = this.noa.entities.addComponent(
      player,
      this.engine.noa.entities.names.mesh,
      {
        mesh,
        offset: [0, 0.5, 0],
      }
    );
    return mesh;
  }
}

export default PlayerManager;
