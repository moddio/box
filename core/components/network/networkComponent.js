import { Component } from "../component";

class NetworkComponent extends Component {
    constructor(parent) {
        super(parent);
        this.snapshot = []
    }

    broadcast(msgType, data) {
        // broadcast creation of this entity to all clients
        for (let id in BOX.Engine.clients) {
            // stream entity creation with entity data
            let client = BOX.Engine.clients[id];
            // socket.emit(data, client.socketId)
        }
    }

    addEntity() {
        
    }

    removeEntity() {
        // broadcast removal of this entity to all clients
    }
    // create snapshot

    
}

