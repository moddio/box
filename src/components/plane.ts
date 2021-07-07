import * as THREE from "three";

export const plane = () => {
  const geometry = new THREE.PlaneBufferGeometry(50, 50);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    wireframe: false,
  });
  const plane = new THREE.Mesh(geometry, material);

  plane.rotation.set(-Math.PI / 2, 0, 0);
  plane.position.set(0, -0.6, 0);

  return plane;
};
