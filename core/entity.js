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

import "../core/components/control/controlComponent";
export class Entity {
  contructor() {
    this._components = {};
    //this.id = automatically generated id
    console("also called here");
  }

  id() {
    return this.id;
  }

  addComponent(componentName) {
    // create a new instance of the component's class
    switch (componentName) {
      case "ControlComponent":
        import("../core/components/control/controlComponent").then((module) => {
          this._components = new module[componentName]();
          console.log("this component", this._components);
        });
        break;
      case "ServerNetworkComponent":
        import("../core/components/network/ServerNetworkComponent").then(
          (module) => {
            this._components = new module[componentName]();
            //console.log("this component", this._components);
          }
        );
        break;
    }
  }

  removeComponent(componentName) {}

  setState(stateId) {}

  setStreamMode(mode) {}

  tick() {
    // for each this._components, run their tick
  }
}
