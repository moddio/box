import { Unit } from "./unit";

class UnitManager {
  constructor(player) {
    this.player = player;
  }

  createUnit() {
    let unit = new Unit();

    // const mesh = Mesh.CreateBox("player-mesh", 1);
    // const a = this.noa.entities.addComponent(
    //   player,
    //   this.noa.entities.names.mesh,
    //   {
    //     mesh,
    //     offset: [0, 0.5, 0],
    //   }
    // );

    unit.createNoaEntity();
    return unit.id();
  }
}

export default UnitManager;
