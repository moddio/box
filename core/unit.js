"use strict";

//this class needs to extend entity
import "@babylonjs/core/Meshes/Builders/boxBuilder";
import "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
var Entity = require("./entity");

class Unit extends Entity {
  constructor(engine) {
    this.engine = engine;
  }

  shootBouncyBall() {
    const ents = noa.entities;

    let ballMesh = Mesh.CreateSphere("ball", 1, 1, noa.rendering.getScene());

    const playerPosition = ents.getPosition(noa.playerEntity);
    const pos = [
      playerPosition[0] + 1,
      playerPosition[1] + 0.5,
      playerPosition[2] + 1,
    ];
    const width = 1;
    const height = 1;

    const mesh = ballMesh.createInstance("ball_instance");
    const meshOffset = [0, 1, 0];
    const doPhysics = true;

    const id = noa.entities.add(
      pos,
      width,
      height, // required
      mesh,
      meshOffset,
      doPhysics
    );

    return id;
  }

  pickupItem() {}

  dropItem() {}

  destroy() {}
}
