import { io } from "socket.io-client";
import map from "../config/map/map.json";
import loadMap from "./components/map/tiledLoader";
import loadRegions from "./components/map/regionLoader";

const socket = io("http://localhost:3000");

var blocksState;

socket.on("mapBlockState", (removedBlocks) => {
  blocksState = removedBlocks;
  console.log("blockState", blocksState);
});

// Function that return random material using a sin and cos graph
const getVoxelID = (x, y, z, { waterBlock, grassBlock }) => {
  for (let elem in blocksState) {
    if (blocksState[elem][0] === x && blocksState[elem][1] === y && blocksState[elem][2] === z) return false;
  }
  if (y < -3) return waterBlock;
  var height = 2 * Math.sin(x / 10) + 3 * Math.cos(z / 20);
  if (y < height) return grassBlock;
  return 0;
};

const generateWorld = () => {
  //const scene = BOX.Engine.noa.rendering.getScene();
  /*const createAtlas = require("babylon-atlas");
  const atlas = createAtlas(
    "tilesheet_complete.png",
    "tilesheet_complete.json",
    scene,
    BABYLON
  );*/

  // 3D person perspective camera
  BOX.Engine.noa.camera.zoomDistance = 8;

  //generate material for each texture in tile sheet
  const textures = map.textures;
  let tiles = {};

  //for each texture in map.json file create top, buttom and side materials and register blocks
  Object.values(textures).forEach((texture, index) => {
    index = index + 1;
    const topMaterial = BOX.Engine.noa.registry.registerMaterial("material_top_" + index.toString(), null, texture.top);
    const bottomMaterial = BOX.Engine.noa.registry.registerMaterial("material_bottom_" + index.toString(), null, texture.bottom);
    const sideMaterial = BOX.Engine.noa.registry.registerMaterial("material_side_" + index.toString(), null, texture.side);
    tiles[index.toString()] = BOX.Engine.noa.registry.registerBlock(index, {
      material: ["material_top_" + index.toString(), "material_bottom_" + index.toString(), "material_side_" + index.toString()],
    });
  });

  /*for (let i = 1; i < 541; i++) {
    const tileIndex = i;
    let tileIndexString = i.toString();
    if (tileIndexString.length < 2) tileIndexString = "00" + tileIndexString;
    if (tileIndexString.length < 3) tileIndexString = "0" + tileIndexString;

    //old code for rotating textures
    /*const tileMaterial = new BABYLON.StandardMaterial("material_" + tileIndexString, scene);
    tileMaterial.diffuseTexture = new BABYLON.Texture("tilesheet_complete-png-64x64-sprite-png/tile" + tileIndexString + ".png", scene);
    tileMaterial.diffuseTexture.wAng = Math.PI/2;
    box.Engine.noa.registry.registerMaterial("material_" + tileIndexString, null, null, false, tileMaterial);*/

  /*const registeredMaterial = BOX.Engine.noa.registry.registerMaterial(
      "material_" + tileIndexString,
      null,
      "tilesheet_complete-png-64x64-sprite-png/tile" + tileIndexString + ".png"
    );
    tiles[tileIndex.toString()] = box.Engine.noa.registry.registerBlock(tileIndex, { material: "material_" + tileIndexString });
  }*/

  const invisibleMaterial = BOX.Engine.noa.rendering.makeStandardMaterial("invisible");
  invisibleMaterial.diffuseTexture = null;
  invisibleMaterial._alpha = 0;
  BOX.Engine.noa.registry.registerMaterial("invisible", null, null, false, invisibleMaterial);
  const invisibleBlock = BOX.Engine.noa.registry.registerBlock(1000, {
    material: "invisible",
  });

  // attempt to load materials from tile sheet
  /*const tileMaterial = BOX.Engine.noa.rendering.makeStandardMaterial("tile");
  tileMaterial.diffuseTexture = atlas.makeSpriteTexture("frame_001");
  BOX.Engine.noa.registry.registerMaterial("tile", null, null, false, tileMaterial);
  
  var mat1 = new BABYLON.StandardMaterial("mat1", scene);
  mat1.diffuseTexture = new BABYLON.Texture("tilesheet_complete.png", scene);
  mat1.diffuseTexture.uScale = 0.37;
  mat1.diffuseTexture.vScale = 0.05;
  BOX.Engine.noa.registry.registerMaterial("mat1", null, null, false, mat1);*/

  /*var arrTexture = new BABYLON.RawTexture2DArray("tilesheet_complete.png", 128, 128, 3, 0, scene);
  console.log (arrTexture);*/

  //tileMaterial.opacityTexture = tileMaterial.diffuseTexture;
  //atlas.setTextureFrame(tileMaterial.diffuseTexture, 'frame_001');
  //console.log("logging", BOX.Engine.noa.targetedBlock);
  //atlas.setTextureFrame(mat.diffuseTexture, 'player_jump')y
  //tileMaterial.diffuseTexture = new Texture('./tilesheet_complete.png', scene)
  //tileMaterial.opacityTexture = tileMaterial.diffuseTexture;
  //var tileTexture = new BABYLON.Vector4(0, 0, 0, 0);
  //c * 1/6, r * 1/4, (c + 1) * 1/6, (r + 1) * 1/4
  //var mat = myExistingMesh.material

  // Generate the map randomly
  /*BOX.Engine.noa.world.on("worldDataNeeded", (id, data, x, y, z) => {
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
    BOX.Engine.noa.world.setChunkData(id, data);
  });*/

  let check = 0;
  // Loading tiled map from map.json
  BOX.Engine.noa.world.on("worldDataNeeded", (id, data) => {
    if (check > 0) return;
    check++;
    loadMap(map, data, tiles, invisibleBlock);
    BOX.Engine.noa.world.setChunkData(id, data);
    return;
  });

  loadRegions (map);

};

export default generateWorld;
