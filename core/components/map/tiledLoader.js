function loadMap(map, data, tiles, invisibleBlock) {
  let height = map.height;
  let width = map.width;
  let layers = map.layers.length;
  console.log('Map loading - height:', height, ', width:', width, ', layers:', layers);

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

  map.layers.forEach(function (layer, layerIndex) {
    const layerData = layer.data;
    layerData.forEach(function (block, blockIndex) {
      let x = blockIndex;
      let y = Math.floor(blockIndex / layer.width);
      let z = layerIndex;

      if (x >= layer.width) x = x - y * 59;

      if (block !== 0) {
        data.set(y, z, x, tiles[block]);
        //console.log("Block placed: ", x, z, y, block);
      }
    });
  });
}

export default loadMap;
