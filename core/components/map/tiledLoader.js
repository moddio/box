function loadMap(map, data, tiles, invisibleBlock) {
  /*let height = mapData.height;
    let width = mapData.width;
    let layers = mapData.layers.length;*/
  //console.log('Map loading - height:', height, ', width:', width, ', layers:', layers);

  // border generation

  /*for (let i = 0; i <= map.height; i++) {
    data.set(i, 30, i, invisibleBlock);
    let j = 4;
    //data.set(i, 35, i, waterID);
    while (j <= 35) {
      data.set(i, j, map.height, invisibleBlock);
      data.set(map.height, j, i, invisibleBlock);
      data.set(0, j, i, invisibleBlock);
      data.set(i, j, 0, invisibleBlock);
      j++;
    }
  }*/

  map.layers.forEach(function (layer, layerIndex) {
    const layerData = layer.data;
    layerData.forEach(function (block, blockIndex) {
      let x = blockIndex;
      let y = Math.floor(blockIndex / layer.width);
      let z = layerIndex;

      if (x >= layer.width) x = x - y * 20;

      if (block !== 0 && block < 249) data.set(x, z, y, tiles[block]);

      //if (block = 1) ;//data.set(x, z, y, waterID);
      //else data.set(x, z, y, blocksID);
      //data.set(x, 30, y, invisibleBlock);

      //old map creation
      //if (block < 1) box.Engine.noa.setBlock(waterID, x, z, y);
      //else box.Engine.noa.setBlock(blocksID, x, z, y);
      //console.log ('block number', blockIndex, 'x', x, 'y', y, 'z', z);
    });
  });
}

export default loadMap;
