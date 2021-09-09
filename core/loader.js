const components = require('../config/components.json');

console.log(1111111111);

// Getting data from json
var loading = {};
for (let elem in components) {
  typeof components[elem] === 'string' ? (loading[elem] = components[elem]) : '';
  console.log(3333333333);
}

// Loading modules from component data
var loadedComponents = {};
for (let elem in loading) {
  !global.isServer ? (loadedComponents[elem] = require(loading[elem] + '')) : '';
  console.log(loading[elem], 'llllllllllll');
}

module.exports = loader = { loadedComponents };
