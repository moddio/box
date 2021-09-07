import { clientNetworking } from '../core/components/network/clientNetworkEvent.js';

global.isServer = false;
global.isClient = true;
// USE THIS ON DEBUG MODE ONLY NOT IN PRODUCTION
global.BOX = BOX;

var engine = BOX.Engine;
engine.start();

// BOX.Engine.components['NetworkComponent'].connect(serverIP, function(data) {

const client = new clientNetworking();

// });
