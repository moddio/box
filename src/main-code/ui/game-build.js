const gameBuild = () => {
  const water = document.querySelector(".game_build-water");
  const blocks = document.querySelector(".game_build-blocks");
  let clickedEvent;
  water.addEventListener("click", () => (clickedEvent = "water"));
  blocks.addEventListener("click", () => (clickedEvent = "blocks"));

  return clickedEvent;
};

export default gameBuild;
