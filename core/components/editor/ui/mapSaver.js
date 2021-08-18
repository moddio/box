import { savingMap } from "../../map/tiledLoader";

const saveMapButton = () => {
  const saveMapEvent = document.querySelector(".save-map-button");

var jsonFile = null,
makeJsonFile = function (info) {
    var data = new Blob([info], {type: 'application/json'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (jsonFile !== null) {
        window.URL.revokeObjectURL(jsonFile);
    }
  
    jsonFile = window.URL.createObjectURL(data);
    return jsonFile;
};

  saveMapEvent.addEventListener("click", () => {

    var link = document.createElement('a');
    link.setAttribute('download', 'map.json');
    link.href = makeJsonFile(savingMap.saveMap(savingMap.currentMap));
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
		});

  });
};

export default saveMapButton;
