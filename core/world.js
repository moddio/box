import * as BABYLON from "@babylonjs/core";
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { water, blocks } from "./utils/textures";
import { io } from "socket.io-client";
import map from "../config/map/map.json";
import loadMap from "./components/map/tiledLoader";

const socket = io("http://localhost:3000");

var blocksState;

socket.on("mapBlockState", (removedBlocks) => {
  blocksState = removedBlocks;
  console.log("blockState", blocksState);
});

// Function that return random material using a sin and cos graph
const getVoxelID = (x, y, z, { waterID, blocksID }) => {
  for (let elem in blocksState) {
    if (
      blocksState[elem][0] === x &&
      blocksState[elem][1] === y &&
      blocksState[elem][2] === z
    )
      return false;
  }
  if (y < -3) return waterID;
  var height = 2 * Math.sin(x / 10) + 3 * Math.cos(z / 20);
  if (y < height) return blocksID;
  return 0;
};

const generateWorld = () => {
  // 3D person perspective camera
  box.Engine.noa.camera.zoomDistance = 8;

  // Init texture for the map
  box.Engine.noa.registry.registerMaterial("water", null, water);
  box.Engine.noa.registry.registerMaterial("grass", null, blocks);
  //box.Engine.noa.registry.registerMaterial("tile", null, './tilesheet_complete.png');

  var scene = box.Engine.noa.rendering.getScene()
  var tileMaterial = box.Engine.noa.rendering.makeStandardMaterial('');

  var createAtlas = require('babylon-atlas');
  var atlas = createAtlas('tilesheet_complete.png', 'tilesheet_complete.json', scene, BABYLON);
  
  tileMaterial.diffuseTexture = atlas.makeSpriteTexture('frame_001');
  console.log(tileMaterial.diffuseTexture)
  //tileMaterial.opacityTexture = tileMaterial.diffuseTexture;
  //atlas.setTextureFrame(tileMaterial.diffuseTexture, 'frame_001');
  box.Engine.noa.registry.registerMaterial('tile', null, null, false, tileMaterial);

  //atlas.setTextureFrame(mat.diffuseTexture, 'player_jump')y
  //tileMaterial.diffuseTexture = new Texture('./tilesheet_complete.png', scene)
  //tileMaterial.opacityTexture = tileMaterial.diffuseTexture;
  //var tileTexture = new BABYLON.Vector4(0, 0, 0, 0);
  //c * 1/6, r * 1/4, (c + 1) * 1/6, (r + 1) * 1/4
  //var mat = myExistingMesh.material

  // Save texture inside register Block
  const waterID = box.Engine.noa.registry.registerBlock(1, {
    material: "tile",
  });
  const blocksID = box.Engine.noa.registry.registerBlock(2, {
    material: "grass",
  });

  // Generate the map randomly
  /*box.Engine.noa.world.on("worldDataNeeded", (id, data, x, y, z) => {
    for (let i = 0; i < data.shape[0]; i++) {
      for (let j = 0; j < data.shape[1]; j++) {
        for (let k = 0; k < data.shape[2]; k++) {
          let voxelID = getVoxelID(x + i, y + j, z + k, {
            blocksID,
            waterID,
          });
          data.set(i, j, k, voxelID);
        }
      }
    }
    box.Engine.noa.world.setChunkData(id, data);
  });*/

  var check = 0;
  // Loading tiled map from map.json
  box.Engine.noa.world.on("worldDataNeeded", (id, data) => {

    if (check > 0) return;
    check++;
    loadMap(map, data, blocksID, waterID)

    box.Engine.noa.world.setChunkData(id, data);

    box.Engine.noa.setBlock(waterID, 11, 10, 11);

    return;
  });

  
};

export default generateWorld;
