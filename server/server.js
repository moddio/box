const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// removed blocks position [x,y,z]
const removedBlocks = [];

import { Engine } from "../core/engine";

// global variables
var engine = new Engine();
engine.setAsServer();
engine.start();

server.listen(3000, () => {
  console.log("listening on *:3000");
});
