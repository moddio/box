import { tiledSaver } from "./tiledSaver";
import saveMapButton from "../editor/ui/mapSaver";

function loadMap(map, data, tiles, invisibleBlock) {
  let height = map.height;
  let width = map.width;
  let layers = map.layers.length;
  //console.log('Map loading - height:', height, ', width:', width, ', layers:', layers);

  const savingMap = new tiledSaver(height, width); //map data storage
  saveMapButton(savingMap);

  // Border generation
  let i = 0;
  let j = 0;
  let mapHeight = map.height;
  let mapWidth = map.width;
  let mapIndex = 0;
  let heightBorder = 50;
  while (i <= mapHeight) {
    while (j <= mapHeight) {
      data.set(i, heightBorder, j, invisibleBlock);
      data.set(mapHeight, i, j, invisibleBlock);
      data.set(mapIndex, i, j, invisibleBlock);
      data.set(j, i, mapWidth, invisibleBlock);
      data.set(j, i, mapIndex, invisibleBlock);
      j++;
    }
    j = 0;
    i++;
  }

  //block placing
  map.layers.forEach(function (layer, layerIndex) {
    const layerData = layer.data;
    layerData.forEach(function (block, blockIndex) {
      let x = blockIndex;
      let y = Math.floor(blockIndex / width);
      let z = layerIndex;
      if (x >= width) x = x - y * width;
      
      savingMap.saveBlock(y, z, x, block);  //saving block information for saving map later
      if (block !== 0) {
        data.set(y, z, x, tiles[block]);
        //console.log("Block placed: ", x, z, y, block);
      }
    });
  });

  /*savingMap.saveBlock(0, 0, 0, 0);
  savingMap.saveBlock(0, 0, 1, 0);
  savingMap.saveBlock(0, 0, 2, 0);
  savingMap.saveBlock(0, 0, 3, 0);*/

}

export default loadMap;
