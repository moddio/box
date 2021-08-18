export class tiledSaver {
    constructor (height, width) {
        this.currentBlocks = [];
        this.currentMap = {
            height: height,
            width: width,
            layers: []
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
            //console.log(block);
            if (layers[layer]) {
                layers[layer][index] = block.tile;
            }
            else {
                layers[layer] = [];
                layers[layer][index] = block.tile;
            }
        })
        Object.entries(layers).forEach((layer, index) => {
            map.layers[index] = {};
            map.layers[index].data = layer[1];
          });
        const mapJSON = JSON.stringify(map)
        return mapJSON;
    }

        /*(function () {
            var mapJSON = null,
              makeTextFile = function (text) {
                var data = new Blob([text], {type: 'application/json'});
            
                // If we are replacing a previously generated file we need to
                // manually revoke the object URL to avoid memory leaks.
                if (mapJSON !== null) {
                  window.URL.revokeObjectURL(mapJSON);
                }
            
                mapJSON = window.URL.createObjectURL(data);
            
                return mapJSON;
              };
            
            
              var create = document.getElementById('create'),
                textbox = document.getElementById('textbox');
            
              create.addEventListener('click', function () {
                var link = document.createElement('a');
                link.setAttribute('download', 'info.txt');
                link.href = makeTextFile(textBOX.value);
                document.body.appendChild(link);
            
                // wait for the link to be added to the document
                window.requestAnimationFrame(function () {
                  var event = new MouseEvent('click');
                  link.dispatchEvent(event);
                  document.body.removeChild(link);
                    });
                
              }, false);
            })();*/
}