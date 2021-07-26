var numberOfblocks = 0;
export const createBlockEvent = ({ blocks }) => {
  const waterID = noa.registry.registerBlock(1, { material: "water" });
  const goldID = noa.registry.registerBlock(3, { material: "gold" });
  const diamondID = noa.registry.registerBlock(4, { material: "diamond" });
  const dirtID = noa.registry.registerBlock(5, { material: "dirt" });
  const grassID = noa.registry.registerBlock(2, { material: "grass" });

  while (numberOfblocks < blocks.length - 1) {
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
};

export const removeBlockEvent = (position) => {
  const pos = [...position];
  noa.setBlock(0, pos[0], pos[1], pos[2]);
  numberOfblocks--;
};

var allPlayers = [];
var numberOfPlayer = 0;
const playersCount = document.querySelector(".players");
const playerEvent = document.querySelector(".player_table");

export const removePlayerEvent = (playerID) => {
  numberOfPlayer--;
  playersCount.innerHTML = `Number of players connected ${numberOfPlayer}`;
  console.log(`player ${playerID} is offline`);
};

export const playersEvent = ({ data }) => {
  allPlayers = [...data];
  // Count number of player
  while (numberOfPlayer <= allPlayers.length - 1) {
    playerEvent.innerHTML +=
      '<li class="player">' +
      '      <div class="left">' +
      '        <span class="player_index">' +
      numberOfPlayer +
      "</span>" +
      '        <span class="player_name">' +
      allPlayers[numberOfPlayer].ID +
      "</span>" +
      "      </div>" +
      '      <div class="right">' +
      '        <span class="player_score"> ' +
      allPlayers[numberOfPlayer].position +
      "</span>" +
      "      </div>" +
      "    </li>";
    numberOfPlayer++;
  }
  playersCount.innerHTML = `Number of players connected ${numberOfPlayer}`;
  console.log("allPlayers", allPlayers);
  console.log("number of players", numberOfPlayer);
};

export const playersDataEvent = (socketID, playerPosition) => ({
  ID: socketID,
  position: playerPosition,
});
