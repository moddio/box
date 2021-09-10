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
  // <--- We don't need this also ------>
  broadcast(msgType, data) {
    BOX.Engine.io.sockets.emit(msgType, data);
  }

  test () {
    BOX.Engine.io.sockets.emit('hello')
  }

  queueStreamData(id, pos) {
    this.snapshot[id] = pos
  }

}

module.exports = { ServerNetworkComponent };