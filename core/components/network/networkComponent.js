class NetworkComponent {
    constructor() {
        this.snapshot = []
    }

    addEntity() {
        // broadcast creation of this entity to all clients
        for (let id in BOX.Engine.clients) {
            // stream entity creation with entity data
        }
    }

    removeEntity() {
        // broadcast removal of this entity to all clients
    }
    // create snapshot

    
}

