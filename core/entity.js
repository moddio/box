/**
       we can add component in noa using ents.addComponent
       we can't delete noa component because it's built in
       we can delete component in noa using ents.deleteEntity
       comoponent have IDs that define them, and we can access any component using 
       ents.getPhysicsBody(id) and run ticks inside each component using 
       ents.system = (_, state) => {
           run every component inside ticks
           loop over state {
               component 1
               component 2
               component 3...
           }
       }
   */
export class Entity {

    contructor() {
        this._components = {}
        //this.id = automatically generated id
        console("also called here")
    }

    id() {
        return this.id;
    }

    addComponent(componentName) {
        // create a new instance of the component's class
        this._components[componentName] = new {componentName}() 
    }

    removeComponent(componentName) {
        
    }

    setState(stateId) {

    }

    setStreamMode(mode) {

    }

    tick() {
        // for each this._components, run their tick
    }
}
