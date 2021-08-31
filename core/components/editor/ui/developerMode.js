import map from "/config/map/map.json";
import { Component } from "../../component";

class DeveloperMode extends Component {
  constructor() {
    super();

    console.log("xxxxxxxx", this.parent);

    this.test = "hello developer";
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
        BOX.components["ControlComponent"].materialType = index + 1;
      });
    });

    document.querySelector(".game_build").style.display = "none";

    //show block menu in developer mode and hide without developer mode
    const developerModeEvent = document.getElementById("developer-mode-button");
    developerModeEvent.addEventListener("click", () => {
      if (developerModeEvent.checked) {
        document.querySelector(".game_build").style.display = "block";
        BOX.developerMode.status = true;
      } else {
        document.querySelector(".game_build").style.display = "none";
        BOX.developerMode.status = false;
      }
    });
  }
}

export default DeveloperMode;

/*const developerModeButton = () => {

  //go through map.json textures and make interface image for each type of block
  Object.values(map.textures).forEach((texture, index) => {
    const img = new Image();
    img.src = texture.side;
    document.querySelector('.game_build_textures').appendChild(img);
    img.classList.add("block_" + index.toString());

    // Player Event on mouse click 
    const imageClick = document.querySelector(".block_" + index.toString());
    imageClick.addEventListener("click", () => {
      BOX.Control.ControlComponent.materialType = index + 1;

    });
  })

  document.querySelector(".game_build").style.display = "none";
  
  //show block menu in developer mode and hide without developer mode
  const developerModeEvent = document.getElementById("developer-mode-button");
  developerModeEvent.addEventListener("click", () => {
    if (developerModeEvent.checked) {
      document.querySelector(".game_build").style.display = "block";
    } else {
      document.querySelector(".game_build").style.display = "none";
    }
  });
};

export default developerModeButton;*/
