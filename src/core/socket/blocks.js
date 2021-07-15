var numberOfblocks = 0;
export const createBlockEvent = ({ blocks }) => {
  const waterID = noa.registry.registerBlock(1, { material: "water" });
  if (numberOfblocks === 0) {
    console.log("Loading blocks materials");
    // timeout for loading the scene and blocks
    setTimeout(() => {
      while (numberOfblocks <= blocks.length - 1) {
        const pos = [...blocks[numberOfblocks].water];
        noa.setBlock(waterID, pos[0], pos[1], pos[2]);
        numberOfblocks++;
      }
      console.log("blocks data", blocks, "numberofblocks", numberOfblocks);
    }, 1000);
  } else {
    while (numberOfblocks <= blocks.length - 1) {
      const pos = [...blocks[numberOfblocks].water];
      noa.setBlock(waterID, pos[0], pos[1], pos[2]);
      numberOfblocks++;
    }
    console.log("blocks data", blocks, "numberofblocks", numberOfblocks);
  }
};

export const removeBlockEvent = (water) => {
  console.log("waterremove", water);
  const pos = [...water];
  noa.setBlock(0, pos[0], pos[1], pos[2]);
  numberOfblocks--;
};
