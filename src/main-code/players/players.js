import { Mesh } from "@babylonjs/core/Meshes/mesh";
import "@babylonjs/core/Meshes/Builders/boxBuilder";
import "@babylonjs/core/Meshes/Builders/sphereBuilder";

export const newPlayer = (noa, position) => {
  const ents = noa.entities;

  const boxMesh = Mesh.CreateBox("player-mesh", 1);

  const playPos = ents.getPosition(noa.playerEntity);
  const pos = [...position];
  const width = 2;
  const height = 2;

  const mesh = boxMesh.createInstance("palyer-instance");
  console.log(mesh);
  const meshOffset = [0, 0.5, 0];
  const doPhysics = true;
  const shadow = true;

  const id = noa.entities.add(
    pos,
    width,
    height,
    mesh,
    meshOffset,
    doPhysics,
    shadow
  );
  const body = ents.getPhysicsBody(id);
  return body;
};
