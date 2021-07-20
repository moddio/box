import { Mesh } from "@babylonjs/core/Meshes/mesh";

class PlayerManager {
  constructor(noa) {
    this.noa = noa;
  }
  createPlayer(id) {
    // Player Setup
    let player = id;
    const mesh = Mesh.CreateBox("player-mesh", 1, scene);
    const a = this.noa.entities.addComponent(
      player,
      this.noa.entities.names.mesh,
      {
        mesh,
        offset: [0, 0.5, 0],
      }
    );
    return mesh;
  }
}

export default PlayerManager;
