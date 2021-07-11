const eventPlayer = (noa) => {
  // event handlers
  const pauseEvent = document.querySelector(".game_build-pause");
  // Player Event on keyborad or mouse click

  noa.inputs.down.on("fire", () => {
    if (noa.targetedBlock) {
      const pos = noa.targetedBlock.adjacent;
      noa.setBlock("", pos[0], pos[1], pos[2]);
    }
  });

  let paused = false;
  pauseEvent.addEventListener("click", () => {
    paused = !paused;
    noa.setPaused(paused);
  });
  noa.inputs.down.on("alt-fire", () => {
    if (noa.targetedBlock) {
      let pos = noa.targetedBlock.position;
      noa.setBlock(0, pos[0], pos[1], pos[2]);
    }
  });
};

export default eventPlayer;
