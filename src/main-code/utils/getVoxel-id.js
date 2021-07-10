// drawing boxes inside the map

const getVoxelID = (x, y, z, { waterID, blocksID }) => {
  if (y < -3) return waterID;
  var height = 2 * Math.sin(x / 10) + 3 * Math.cos(z / 20);
  if (y < height) return blocksID;
  return 0;
};

export default getVoxelID;
