import { textures } from "../utils/textures";

export const guiBuild = () => {
  const blocks = document.querySelector(".game_build_textures");
  textures.map((texture) => {
    const block = document.createElement("img");
    block.src = texture;
    blocks.appendChild(block);
  });
};

/**
 * export const gameBuild = () => {
  const createdBlocks = Array.from(document.querySelectorAll(".game_build_textures img"));
  createdBlocks.map((block) => {
    block.addEventListener("click", () => {
      return block.src
    });
  });
};
 */
