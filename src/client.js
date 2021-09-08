require('../core/box');
const { clientNetworking } = require('../core/components/network/clientNetworkEvent');

let engine = new BOX.Engine();
BOX.Engine = engine;

engine.start();

// BOX.Engine.components['NetworkComponent'].connect(serverIP, function(data) {

const client = new clientNetworking();

// });
