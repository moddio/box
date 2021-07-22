class Entity {

    constructor() {
        this.components = [];

    }

    setStreamMode(streamMode) {

    }

    addComponent(componentName) {
        var component = require(componentName);
        this.components.push(componentName);
    }

    removeComponent() {

    }

    tick() {
        //run each components for this entity
    }

    destroy() {

    }
}