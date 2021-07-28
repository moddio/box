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
    this._components = {};
    this.id = generateId();
    this.body = undefined;
    console("also called here");
  }

  id() {
    return this.id;
  }

  createBody(offset) {
    const mesh = box.engine.Mesh.CreateBox("player-mesh", this.id);
    box.noa.entities.addComponent(id, box.noa.entities.names.mesh, {
      mesh,
      offset,
    });
    return mesh;
  }

  addComponent(componentName) {
    console.log("this a test for addComponent", componentLoader[componentName]);
    this._components = new componentLoader[componentName](1);
  }

  removeComponent(componentName) {}

  setState(stateId) {}

  setStreamMode(mode) {}

  generateId() {
    return Math.random()
      .toString(36)
      .split("")
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .join("")
      .substr(2, 8);
  }

  tick() {
    // for each this._components, run their tick
  }
}
