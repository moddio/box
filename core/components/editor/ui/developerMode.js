const developerModeButton = () => {
  document.querySelector(".game_build").style.display = "none";
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
