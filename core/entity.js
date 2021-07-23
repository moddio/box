/**
       we can add component in noa using ents.addComponent
       we can't delete noa component because it's built in ents.delete
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
  constructor() {
    //this.noaEntity = reference to noa's entity
    this.components = {};
  }

  createNoaEntity(
    pos,
    width,
    height, // required
    mesh,
    meshOffset,
    doPhysics,
    shadow // optional
  ) {
    var id = engine.noa.entities.add(
      pos,
      width,
      height, // required
      mesh,
      meshOffset,
      doPhysics,
      shadow // optional
    );

    this.noaEntity = engine.noa.getEntity(id);

    return id;
  }

  id() {}

  setStreamMode() {}

  addComponent(componentName) {
    this.components[componentName] = new { componentName }(engine, player);
  }

  removeComponent() {}

  tick() {}
}
