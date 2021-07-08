import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/textures/grass_block_side.png");

// Box
export const box = () => {
  const box = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshPhongMaterial({ map: texture })
  );

  box.position.set(114.21428960237601, 71.80326447920699, 145.86937728311378);
  return box;
};
