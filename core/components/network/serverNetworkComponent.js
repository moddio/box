const { Component } = require('../component');

class ServerNetworkComponent extends Component {
  constructor(parent) {
    super(parent);
    this.players = {};
    this.streamData = {};
    this.snapshot = {};
    this.clients = {};
    this.io = ''; 
  }

  broadcast(msgType, data) {
    BOX.Engine.io.sockets.emit(msgType, data);
  }

  queueStreamData(id, pos) {
    this.snapshot[id] = pos
  }

}

module.exports = { ServerNetworkComponent };