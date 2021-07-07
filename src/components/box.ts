import * as THREE from "three";

// Box
export const box = () => {
  const box = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshPhongMaterial({ color: 0xff0000 })
  );

  return box;
};
