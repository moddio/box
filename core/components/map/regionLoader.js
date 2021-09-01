function loadRegions(map) {
    const regions = map.regions

    Object.values(map.regions).forEach(element => {
        const region = BOX.Engine.addEntity({
            type: 'Region',
            position: element.position,
            doPhysics: false,
            body: {
              offset: [0, 0.5, 0],
              type: 'CreateBox',
              offset: [0, 0.5, 0],
              radius: 0.2,
              width: 5,
              height: 8,
              roundShap: [null, null],
              scaling: element.scaling,
              linearDamping: 0.5,
              friction: 0
            }
          });
        
          console.log('CREATING REGION', region);
          region.mesh.visibility = 0.6;
        
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


    
  }
  
  export default loadRegions;