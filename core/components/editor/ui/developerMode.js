import map from "/config/map/map.json";
import { savingMap } from "/core/components/map/tiledLoader"; // <- get rid of this
import { Component } from "../../component";

class DeveloperMode extends Component {
  constructor(parent) {
    super(parent);

    this.currentMaterial = 1;
    this.status = false;

    this.developerModeButton();
  }
  developerModeButton() {
    //go through map.json textures and make interface image for each type of block
    Object.values(map.textures).forEach((texture, index) => {
      const img = new Image();
      img.src = texture.side;
      document.querySelector(".game_build_textures").appendChild(img);
      img.classList.add("block_" + index.toString());

      // Player Event on mouse click
      const imageClick = document.querySelector(".block_" + index.toString());
      imageClick.addEventListener("click", () => {
        this.currentMaterial = index + 1;
      });
    });

    document.querySelector(".game_build").style.display = "none";

    //show block menu in developer mode and hide without developer mode
    const developerModeEvent = document.getElementById("developer-mode-button");
    developerModeEvent.addEventListener("click", () => {
      if (developerModeEvent.checked) {
        document.querySelector(".game_build").style.display = "block";
        this.status = true;
      } else {
        document.querySelector(".game_build").style.display = "none";
        this.status = false;
      }
    });
  }

  addBlock() {
    console.log('placing block')
    const pos = BOX.Engine.noa.targetedBlock.adjacent;
    BOX.Engine.noa.addBlock(this.currentMaterial, pos[0], pos[1], pos[2]);
    savingMap.saveBlock(pos[0], pos[1], pos[2], this.currentMaterial);
  }

  removeBlock() {
    const pos = BOX.Engine.noa.targetedBlock.position;
    //check if target block is invisible material
    if (BOX.Engine.noa.targetedBlock.blockID === 1000) {
      ("");
    } else {
      BOX.Engine.noa.setBlock(0, pos[0], pos[1], pos[2]);
      savingMap.saveBlock(pos[0], pos[1], pos[2], 0);
    }
  }
}

export default DeveloperMode;