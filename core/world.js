import { water, blocks } from "./utils/textures";
import * as BABYLON from "@babylonjs/core";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { io } from "socket.io-client";
import map from "../config/map/map.json";
import newmap from "../config/map/map_new.json";
import loadMap from "./components/map/tiledLoader";

const socket = io("http://localhost:3000");

var blocksState;

socket.on("mapBlockState", (removedBlocks) => {
  blocksState = removedBlocks;
  console.log("blockState", blocksState);
});

// Function that return random material using a sin and cos graph
const getVoxelID = (x, y, z, { waterBlock, grassBlock }) => {
  for (let elem in blocksState) {
    if (
      blocksState[elem][0] === x &&
      blocksState[elem][1] === y &&
      blocksState[elem][2] === z
    )
      return false;
  }
  if (y < -3) return waterBlock;
  var height = 2 * Math.sin(x / 10) + 3 * Math.cos(z / 20);
  if (y < height) return grassBlock;
  return 0;
};

const generateWorld = () => {
  const scene = box.Engine.noa.rendering.getScene();
  const createAtlas = require("babylon-atlas");
  const atlas = createAtlas(
    "tilesheet_complete.png",
    "tilesheet_complete.json",
    scene,
    BABYLON
  );

  // 3D person perspective camera
  box.Engine.noa.camera.zoomDistance = 8;

  // register materials
  box.Engine.noa.registry.registerMaterial("water", null, water);
  box.Engine.noa.registry.registerMaterial("grass", null, blocks);
  //box.Engine.noa.registry.registerMaterial("dirt", null, "tilesheet_complete-png-64x64-sprite-png/tile004.png");

  //generate material for each texture in tile sheet
  let tiles = {};
  for (let i = 0; i < 250; i++) {
    const tileIndex = i + 1;
    //box.Engine.noa.registry.registerMaterial("material_1", null, "tilesheet_complete-png-64x64-sprite-png/tile001.png");
    //tiles[1] = box.Engine.noa.registry.registerBlock(1, { material: "material_1"});
    let tileIndexString = tileIndex.toString();
    if (tileIndexString.length < 2) tileIndexString = "00" + tileIndexString;
    if (tileIndexString.length < 3) tileIndexString = "0" + tileIndexString;
    box.Engine.noa.registry.registerMaterial("material_" + tileIndexString, null, "tilesheet_complete-png-64x64-sprite-png/tile" + tileIndexString + ".png");
    tiles[tileIndex.toString()] = box.Engine.noa.registry.registerBlock(tileIndex, { material: "material_" + tileIndexString });
    //console.log(tiles[tileIndex.toString()]);
  }
  
  //console.log(tiles);

  const invisibleMaterial =
    box.Engine.noa.rendering.makeStandardMaterial("invisible");
  invisibleMaterial.diffuseTexture = atlas.makeSpriteTexture("frame_000");
  box.Engine.noa.registry.registerMaterial(
    "invisible",
    null,
    null,
    false,
    invisibleMaterial
  );

  // attempt to load materials from tile sheet
  /*const tileMaterial = box.Engine.noa.rendering.makeStandardMaterial("tile");
  tileMaterial.diffuseTexture = atlas.makeSpriteTexture("frame_001");
  box.Engine.noa.registry.registerMaterial("tile", null, null, false, tileMaterial);
  
  var mat1 = new BABYLON.StandardMaterial("mat1", scene);
  mat1.diffuseTexture = new BABYLON.Texture("tilesheet_complete.png", scene);
  mat1.diffuseTexture.uScale = 0.37;
  mat1.diffuseTexture.vScale = 0.05;
  box.Engine.noa.registry.registerMaterial("mat1", null, null, false, mat1);*/

  /*var arrTexture = new BABYLON.RawTexture2DArray("tilesheet_complete.png", 128, 128, 3, 0, scene);
  console.log (arrTexture);*/

  //tileMaterial.opacityTexture = tileMaterial.diffuseTexture;
  //atlas.setTextureFrame(tileMaterial.diffuseTexture, 'frame_001');
  //console.log("logging", box.Engine.noa.targetedBlock);
  //atlas.setTextureFrame(mat.diffuseTexture, 'player_jump')y
  //tileMaterial.diffuseTexture = new Texture('./tilesheet_complete.png', scene)
  //tileMaterial.opacityTexture = tileMaterial.diffuseTexture;
  //var tileTexture = new BABYLON.Vector4(0, 0, 0, 0);
  //c * 1/6, r * 1/4, (c + 1) * 1/6, (r + 1) * 1/4
  //var mat = myExistingMesh.material

  // Save texture inside register Block
  /*const waterBlock = box.Engine.noa.registry.registerBlock(1, {
    material: "water",
  });*/
  /*const grassBlock = box.Engine.noa.registry.registerBlock(2, {
    material: "grass",
  });*/
  /*const tileBlock = box.Engine.noa.registry.registerBlock(1, {
    material: "dirt",
  });*/
  const invisibleBlock = box.Engine.noa.registry.registerBlock(255, {
    material: "invisible",
  });

  // Generate the map randomly
  /*box.Engine.noa.world.on("worldDataNeeded", (id, data, x, y, z) => {
    for (let i = 0; i < data.shape[0]; i++) {
      for (let j = 0; j < data.shape[1]; j++) {
        for (let k = 0; k < data.shape[2]; k++) {
          let voxelID = getVoxelID(x + i, y + j, z + k, {
            grassBlock,
            waterBlock,
          });
          data.set(i, j, k, voxelID);
        }
      }
    }
    box.Engine.noa.world.setChunkData(id, data);
  });*/

  let check = 0;
  // Loading tiled map from map.json
  box.Engine.noa.world.on("worldDataNeeded", (id, data) => {
    if (check > 0) return;
    check++;
    loadMap(map, data, tiles, invisibleBlock);

    box.Engine.noa.world.setChunkData(id, data);

    //for testing
    box.Engine.noa.setBlock(tiles[1], 10, 5, 10);

    return;
  });
};

export default generateWorld;
