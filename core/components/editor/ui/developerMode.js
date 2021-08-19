import map from "/config/map/map.json";

const developerModeButton = () => {

  //go through map.json textures and make interface image for each type of block
  Object.values(map.textures).forEach((texture) => {
    var img = new Image();
    img.src = texture.side;
    document.querySelector('.game_build_textures').appendChild(img);
  })

  document.querySelector(".game_build").style.display = "none";
  
  //show block menu in developer mode and hide without developer mode
  const developerModeEvent = document.getElementById("developer-mode-button");
  developerModeEvent.addEventListener("click", () => {
    if (developerModeEvent.checked) {
      console.log("developer mode on");
      document.querySelector(".game_build").style.display = "block";
    } else {
      console.log("developer mode off");
      document.querySelector(".game_build").style.display = "none";
    }
  });
};

export default developerModeButton;
