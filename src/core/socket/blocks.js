var numberOfblocks = 0;
export const createBlockEvent = ({ blocks }) => {
  const waterID = noa.registry.registerBlock(1, { material: "water" });
  const goldID = noa.registry.registerBlock(3, { material: "gold" });
  const diamondID = noa.registry.registerBlock(4, { material: "diamond" });
  const dirtID = noa.registry.registerBlock(5, { material: "dirt" });
  const grassID = noa.registry.registerBlock(2, { material: "grass" });
  if (numberOfblocks === 0) {
    console.log("Loading blocks materials");
    // timeout for loading the scene and blocks
    setTimeout(() => {
      console.log("blocks data", blocks, "numberofblocks", numberOfblocks);
      while (numberOfblocks <= blocks.length - 1) {
        if (blocks[numberOfblocks].id === "water") {
          const pos = [...blocks[numberOfblocks].position];
          noa.setBlock(waterID, pos[0], pos[1], pos[2]);
          numberOfblocks++;
        }
        if (blocks[numberOfblocks].id === "gold") {
          const pos = [...blocks[numberOfblocks].position];
          noa.setBlock(goldID, pos[0], pos[1], pos[2]);
          numberOfblocks++;
        }
        if (blocks[numberOfblocks].id === "diamond") {
          const pos = [...blocks[numberOfblocks].position];
          noa.setBlock(diamondID, pos[0], pos[1], pos[2]);
          numberOfblocks++;
        }
        if (blocks[numberOfblocks].id === "dirt") {
          const pos = [...blocks[numberOfblocks].position];
          noa.setBlock(dirtID, pos[0], pos[1], pos[2]);
          numberOfblocks++;
        }
        if (blocks[numberOfblocks].id === "grass") {
          const pos = [...blocks[numberOfblocks].position];
          noa.setBlock(grassID, pos[0], pos[1], pos[2]);
          numberOfblocks++;
        }
      }
      console.log("blocks data", blocks, "numberofblocks", numberOfblocks);
    }, 1000);
  } else {
    while (numberOfblocks <= blocks.length - 1) {
      if (blocks[numberOfblocks].id === "water") {
        const pos = [...blocks[numberOfblocks].position];
        noa.setBlock(waterID, pos[0], pos[1], pos[2]);
        numberOfblocks++;
      }
      if (blocks[numberOfblocks].id === "gold") {
        const pos = [...blocks[numberOfblocks].position];
        noa.setBlock(goldID, pos[0], pos[1], pos[2]);
        numberOfblocks++;
      }
      if (blocks[numberOfblocks].id === "diamond") {
        const pos = [...blocks[numberOfblocks].position];
        noa.setBlock(diamondID, pos[0], pos[1], pos[2]);
        numberOfblocks++;
      }
      if (blocks[numberOfblocks].id === "dirt") {
        const pos = [...blocks[numberOfblocks].position];
        noa.setBlock(dirtID, pos[0], pos[1], pos[2]);
        numberOfblocks++;
      }
      if (blocks[numberOfblocks].id === "grass") {
        const pos = [...blocks[numberOfblocks].position];
        noa.setBlock(grassID, pos[0], pos[1], pos[2]);
        numberOfblocks++;
      }
    }
    console.log("blocks data", blocks, "numberofblocks", numberOfblocks);
  }
};

export const removeBlockEvent = (position) => {
  console.log("waterremove", position);
  const pos = [...position];
  noa.setBlock(0, pos[0], pos[1], pos[2]);
  numberOfblocks--;
};
