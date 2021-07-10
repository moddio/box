import { water, blocks, tree } from "../config/urls";
import getVoxelID from "../utils/getVoxel-id";

const genWorld = (noa) => {
  // 3D person perspective camera
  noa.camera.zoomDistance = 10;

  // Init texture for the map
  noa.registry.registerMaterial("dirt", null, water);
  noa.registry.registerMaterial("grass", null, blocks);
  noa.registry.registerMaterial("tree", null, tree);

  // Save texture inside register Block
  const waterID = noa.registry.registerBlock(1, { material: "dirt" });
  const blocksID = noa.registry.registerBlock(2, { material: "grass" });

  // Gnerate the map randomly
  noa.world.on("worldDataNeeded", (id, data, x, y, z) => {
    for (let i = 0; i < data.shape[0]; i++) {
      for (let j = 0; j < data.shape[1]; j++) {
        for (let k = 0; k < data.shape[2]; k++) {
          let voxelID = getVoxelID(x + i, y + j, z + k, { blocksID, waterID });
          data.set(i, j, k, voxelID);
        }
      }
    }
    noa.world.setChunkData(id, data);
  });
};

export default genWorld;
