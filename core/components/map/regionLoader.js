function loadRegions(map) {
  //const regions = []

  Object.values(map.regions).forEach(value => {
    const region = BOX.Engine.addEntity({
      type: 'Region',
      name: value.name,
      position: value.position,
      doPhysics: false,
      body: {
        offset: [0, 0.5, 0],
        type: 'CreateBox',
        offset: [0, 0.5, 0],
        radius: 0.2,
        width: 5,
        height: 8,
        roundShap: [null, null],
        scaling: value.scaling,
        linearDamping: 0.5,
        friction: 0
      }
    });

    //console.log('CREATING REGION', region.name);
    region.mesh.visibility = 0;

    /*BOX.Engine.noa.entities.addComponent(region.noaEntityId, BOX.Engine.noa.entities.names.collideEntities, {
      cylinder: true,
      callback: otherEntsId => console.log('collide', region.noaEntityId, otherEntsId)
    });*/

    // // adding component for collision
    // BOX.Engine.noa.entities.addComponent(
    //   noaId,
    //   BOX.Engine.noa.entities.names.collideEntities,
    //   {
    //     cylinder: true,
    //     callback: (otherEntsId) => BOX.collision(noaId, otherEntsId),
    //   }
    // );

    // var body = BOX.Engine.noa.entities.getPhysicsBody(noaId);
  });

  //console.log('FIND ENTITY BY NAME' , BOX.Engine.getEntityByName("player_spawn"));
}

export default loadRegions;
