function loadMap(map, data, blocksID, waterID, invisibleMaterial) {
  /*let height = mapData.height;
    let width = mapData.width;
    let layers = mapData.layers.length;*/
  //console.log('Map loading - height:', height, ', width:', width, ', layers:', layers);

  // border generation

  for (let i = 0; i <= 20; i++) {
    data.set(i, 30, i, invisibleMaterial);
    let j = 4;
    //data.set(i, 35, i, waterID);
    while (j <= 35) {
      data.set(i, j, 20, invisibleMaterial);
      data.set(20, j, i, invisibleMaterial);
      data.set(0, j, i, invisibleMaterial);
      data.set(i, j, 0, invisibleMaterial);
      j++;
    }
  }

  map.layers.forEach(function (layer, layerIndex) {
    const layerData = layer.data;
    layerData.forEach(function (block, blockIndex) {
      let x = blockIndex;
      let y = Math.floor(blockIndex / layer.width);
      let z = layerIndex;

      if (x >= layer.width) x = x - y * 20;

      if (block < 1) data.set(x, z, y, waterID);
      else data.set(x, z, y, blocksID);
      data.set(x, 30, y, invisibleMaterial);

      //old map creation
      //if (block < 1) box.Engine.noa.setBlock(waterID, x, z, y);
      //else box.Engine.noa.setBlock(blocksID, x, z, y);
      //console.log ('block number', blockIndex, 'x', x, 'y', y, 'z', z);
    });
  });
}

export default loadMap;
