import * as THREE from "three";

export const voxelMap = (scene: THREE.Scene, cellSize: number) => {
  const cell = new Uint8Array(cellSize * cellSize * cellSize);
  for (let y = 0; y < cellSize; ++y) {
    for (let z = 0; z < cellSize; ++z) {
      for (let x = 0; x < cellSize; ++x) {
        const height =
          (Math.sin((x / cellSize) * Math.PI * 2) + Math.sin((z / cellSize) * Math.PI * 2)) * 10 +
          cellSize / 2;
        if (height > y && height < y + 1) {
          const offset = y * cellSize * cellSize + z * cellSize + x;
          cell[offset] = 1;
        }
      }
    }
  }

  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: "yellow" });

  for (let y = 0; y < cellSize; ++y) {
    for (let z = 0; z < cellSize; ++z) {
      for (let x = 0; x < cellSize; ++x) {
        const offset = y * cellSize * cellSize + z * cellSize + x;
        const block = cell[offset];
        if (block) {
          const map = new THREE.Mesh(geometry, material);
          map.position.set(x, y, z);
          scene.add(map);
        }
      }
    }
  }
};
