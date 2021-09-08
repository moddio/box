console.log('logging the box', BOX);
const { clientNetworking } = require('../core/components/network/clientNetworkEvent');

console.log('logging the box', BOX.Engine.noa);

let start = new BOX.Engine();
BOX.Engine = start;

start.start();

// BOX.Engine.components['NetworkComponent'].connect(serverIP, function(data) {

const client = new clientNetworking();

// });
