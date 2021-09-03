export class tiledSaver {
    constructor (height, width, textures, regions) {
        this.currentBlocks = [];
        this.currentMap = {
            height: height,
            width: width,
            layers: [],
            textures: textures,
            regions: regions
        };
    }

    //save block in currentBlocks array
    saveBlock (y, z, x, texture) {
        this.currentBlocks.push({tile: texture, coordinates: {y: y, z: z, x: x}})
    }


    //save map and generate map.json file
    saveMap (map) {
        const layers = {};
        this.currentBlocks.forEach(function (block) {
            const layer = block.coordinates.z;
            const index = map.width * block.coordinates.y + block.coordinates.x;
            if (layers[layer]) {
                layers[layer][index] = block.tile;
            }
            else {
                layers[layer] = [];
                layers[layer][index] = block.tile;
            }
        })
        Object.values(layers).forEach((layer, index) => {
            //fill empty layer blocks with zeros
            for (let i = 0; i < map.width * map.height; i++) {
              if (!layer[i]) {layer[i] = 0}
            }
            map.layers[index] = {};
            map.layers[index].data = layer;
          });
        const mapJSON = JSON.stringify(map)
        return mapJSON;
    }
}