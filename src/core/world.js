import { water, blocks } from "./utils/textures";

// Function that return random material using a sin and cos graph
const getVoxelID = (x, y, z, { waterID, blocksID }) => {
  if (y < -3) return waterID;
  var height = 2 * Math.sin(x / 10) + 3 * Math.cos(z / 20);
  if (y < height) return blocksID;
  return 0;
};

const genWorld = (noa) => {
  // 3D person perspective camera
  noa.camera.zoomDistance = 8;

  // Init texture for the map
  noa.registry.registerMaterial("water", null, water);
  noa.registry.registerMaterial("grass", null, blocks);

  // Save texture inside register Block
  const waterID = noa.registry.registerBlock(1, { material: "water" });
  const blocksID = noa.registry.registerBlock(2, { material: "grass" });

  // Generate the map randomly
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
