export const filterData = (buildData, newData, name) => {
  const getSumArray = (arr) => {
    let sum = 0;
    for (let elem in arr) {
      sum += arr[elem];
    }
    return sum;
  };

  let sum1 = getSumArray(newData[name]);
  for (let elem in buildData) {
    if (getSumArray(buildData[elem][name]) == sum1) return false;
  }
  return true;
};
