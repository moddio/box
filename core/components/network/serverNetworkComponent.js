const { Component } = require('../component');

class ServerNetworkComponent extends Component {
  constructor(parent) {
    super(parent);
    this.players = {};
    this.streamData = {};
    this.snapshot = {};
    this.clients = {};
    this.socket = "idk?"
  }
  // <--- We don't need this also ------>
  broadcast(msgType, data) {
    this.socket.broadcast.emit(msgType, data);
  }

  queueStreamData(id, pos) {
    this.snapshot[id] = pos
  }

}

module.exports = { ServerNetworkComponent };