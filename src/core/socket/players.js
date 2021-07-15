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
