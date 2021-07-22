'use strict'

import { io } from "socket.io-client";    

// Client side server logic for socket
const socket = io("http://localhost:3000");
socket.on("connect", () => {
    // Logging out offline players
    socket.on("removePlayer", removePlayerEvent);
    // Listening for player movement change
    socket.on("players", playersEvent);
    // Listening for new block creation
    socket.on("createBlock", createBlockEvent);
    // Listening for new block deletion
    socket.on("removeBlock", removeBlockEvent);
    // Emit your your ID and your initial position to the server
    socket.emit("players", playersDataEvent(socket.id, [0, 10, 0]));
});

import ClientNetworkEvents from "./clientNetworkEvent";

class ClientNetworkManager {

    constructor(engine) {
        this.engine = engine;
        this.socket = socket;    
    }
    
}

export default ClientNetworkManager;