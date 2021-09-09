const components = require('../config/components.json');

// Getting data from json
var loading = {};
for (let elem in components) {
  typeof components[elem] === 'string' ? (loading[elem] = components[elem]) : '';
}

// Loading modules from component data
var loadedComponents = {};
for (let elem in loading) {
  !global.isServer ? (loadedComponents[elem] = require(loading[elem] + '')) : '';
}

module.exports = loader = { loadedComponents };
