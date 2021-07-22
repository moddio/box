(function (global) {
    "use strict";
    global.isServer = true;
  })(this);
  
  // express and http
  const express = require("express");
  const app = express();
  const http = require("http");
  const server = http.createServer(app);
  const networkManager = require("/components/network/serverNetworkManager");
  
  const engine = require("../core/engine.js");
  engine.addComponent("serverNetworkComponent")
  
  server.listen(3000, () => {
    console.log("listening on *:3000");
  });
  