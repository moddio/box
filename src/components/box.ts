import * as THREE from "three";

// Box
export const box = () => {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );

  return box;
};
