const BABYLON = require('@babylonjs/core');

// Engine
//const { Engine: noaEngine } = global.isClient ? require('noa-engine') : false;
global.isClient ? require('./utils/state.min.js') : false;
const config = require('../config/config.json');

// Files
const generateWorld = require('./world.js');
const { Entity } = require('./entity.js');

const loadRegions = require('./components/map/regionLoader'); //need to remove - for now its regions for server
const map = require('../config/map/map.json');

class Engine extends Entity {
  constructor() {
    super({}, true);
    if (BOX.isClient) {
      const canvas = document.getElementById('renderCanvas'); // Get the canvas element
      const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

      const scene = new BABYLON.Scene(engine); //Call the createScene function

      console.log('logging the ammo object', Ammo);

      Ammo().then(() => {
        scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.AmmoJSPlugin());
        console.log('hello');
      });

      //var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
      //var physicsPlugin = new BABYLON.CannonJSPlugin();
      //scene.enablePhysics(gravityVector, physicsPlugin);

      console.log(11111111111111111);

      // Register a render loop to repeatedly render the scene
      engine.runRenderLoop(function () {
        //console.log('check render');
        scene.render();
      });

      //Bounding box Geometry
      var border0 = BABYLON.Mesh.CreateBox('border0', 1, scene);
      border0.scaling = new BABYLON.Vector3(1, 100, 200);
      border0.position.x = -100.0;
      border0.checkCollisions = true;
      border0.isVisible = false;

      var border1 = BABYLON.Mesh.CreateBox('border1', 1, scene);
      border1.scaling = new BABYLON.Vector3(1, 100, 200);
      border1.position.x = 100.0;
      border1.checkCollisions = true;
      border1.isVisible = false;

      var border2 = BABYLON.Mesh.CreateBox('border2', 1, scene);
      border2.scaling = new BABYLON.Vector3(200, 100, 1);
      border2.position.z = 100.0;
      border2.checkCollisions = true;
      border2.isVisible = false;

      // Watch for browser/canvas resize events
      window.addEventListener('resize', function () {
        engine.resize();
        // TODO ADD MOVEMENT TO THE MESH AND THE MESH SHOULD FOLLOW CAMERA
      });

      var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -7), scene);
      camera.setTarget(new BABYLON.Vector3(0, 0, 5));
      camera.attachControl(canvas);

      var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
      light.intensity = 0.7;
      var box1 = BABYLON.Mesh.CreateBox('box1', 1, scene);
      box1.position.y = 1;
      var box2 = BABYLON.Mesh.CreateBox('box2', 2, scene);
      box2.position.y = 1;

      //attach camera to box
      //camera.parent = box1;

      /*
      camera.attachControl(canvas, true);

      // adding key control for camera
      camera.keysUp.push(87);
      camera.keysDown.push(83);
      camera.keysLeft.push(65);
      camera.keysRight.push(68);
      */

      // Keyboard events
      var inputMap = {};
      scene.actionManager = new BABYLON.ActionManager(scene);
      scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
          inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown';
        })
      );
      scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
          inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown';
        })
      );

      var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 1, segments: 12 }, scene);
      new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0.01, friction: 0, restitution: 0 }, scene);
      const body = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0.01, friction: 0.1, restitution: 0 }, scene);
      const boxPhysics = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0.001, friction: 0.1, restitution: 0.9 }, scene);

      sphere.position.y = 10;
      // new BABYLON.PhysicsImpostor({ position: new BABYLON.Vector3(0, 5, -7), rotationQuaternion: null }, 1, null, scene);

      //var ground = BABYLON.MeshBuilder.CreateBox('ground', { width: 80, depth: 80, height: 1 }, scene);
      //ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0 }, scene);

      var ground = BABYLON.Mesh.CreateGround("ground1", 80, 80, 2, scene);
      ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);

      let joint = new BABYLON.HingeJoint({
        mainPivot: new BABYLON.Vector3(0, 1, 0),
        connectedPivot: new BABYLON.Vector3(0, 1, 0),
        mainAxis: new BABYLON.Vector3(0, 1, 0),
        connectedAxis: new BABYLON.Vector3(0, 1, 0)
      });

      // add the main body and joint to the connected axle
      //connectedAxle.physicsImpostor.addJoint(boxPhysics, joint);

      //joint.setMotor(1, 1000);

      scene.enablePhysics();

      //add materials
      var grass = new BABYLON.StandardMaterial('grass', scene);
      grass.diffuseTexture = new BABYLON.Texture('textures/grass_top.png', scene);
      ground.material = grass;

      var wood = new BABYLON.StandardMaterial('wood', scene);
      wood.diffuseTexture = new BABYLON.Texture('textures/wood.png', scene);
      box1.material = wood;
      box2.material = wood;

      // Impulse params
      var impulseDirection = new BABYLON.Vector3(0, 0.1, 0);
      var impulseMagnitude = 0.1;
      var contactLocalRefPoint = BABYLON.Vector3.Zero();

      // Game/Render loop
      scene.onBeforeRenderObservable.add(() => {
        let cameraDirection = camera.getDirection(ground.position);

        let test = box1.getAbsolutePosition();

        let x = 0.1;
        let y = 0.1;

        // rotation key
        if (inputMap['b'] || inputMap['ArrowUp']) {
          // box1.rotate(new BABYLON.Vector3(0, 0.1, 0), 0.1, BABYLON.Space.WORLD);
        }
        // rotation key
        if (inputMap['n'] || inputMap['ArrowUp']) {
          // alert(1);
          //box1.rotate(new BABYLON.Vector3(0, -0.1, 0), 0.1, BABYLON.Space.WORLD);
        }
        // jump
        if (inputMap['p']) {
          body.applyImpulse(impulseDirection.scale(impulseMagnitude), box1.getAbsolutePosition().add(contactLocalRefPoint));
        }
        if (inputMap['w'] || inputMap['ArrowUp']) {
          box1.position.z += Math.abs(x);
          //camera.position.x += Math.abs(x);
          camera.position.z += Math.abs(x);
        }
        if (inputMap['a'] || inputMap['ArrowLeft']) {
          box1.position.x += -Math.abs(x);
          camera.position.x += -Math.abs(x);
          //camera.position.x += -Math.abs(x);
        }
        if (inputMap['s'] || inputMap['ArrowDown']) {
          box1.position.z += -Math.abs(x);
          //camera.position.x += Math.abs(x);
          camera.position.z += -Math.abs(x);
          //camera.position.x +=
        }
        if (inputMap['d'] || inputMap['ArrowRight']) {
          box1.position.x += Math.abs(x);
          camera.position.x += Math.abs(x);
          //camera.position.x += Math.abs(x);
        }
      });

      /**
           var box = BABYLON.MeshBuilder.CreateBox('box', {});
      var box2 = box.clone(box);
      box2.position.x = 20;
      box2.position.y = 20;
      scene.createDefaultEnvironment();
       */
      //this.noa = new noaEngine(config);
      // remove inputs component for player and movement component
      //this.noa.entities.deleteComponent('receivesInputs');
      //this.noa.entities.deleteComponent('movement');
    }
    this.entities = {};
    this.clients = {};
    this.myPlayer;
    this.currentTime = 0;
  }

  start() {
    var self = this;

    console.log('starting the noa engine...');

    let scene = {};

    if (BOX.isClient) {
      generateWorld();

      //scene = this.noa.rendering.getScene();

      // this.addComponent('NetworkComponent');

      //this.noa.camera.sensitivityX = 5;
      //this.noa.camera.sensitivityY = 5;

      /*this.noa.on('tick', () => {
        // Update engine time on each tick
        self.engineStep();
      });*/
      this.addComponent('ClientNetworkComponent');
    } else {
      loadRegions(map);
      this.addComponent('ServerNetworkComponent');
    }
  }

  loadMap(mapData) {}

  engineStep() {
    this.tickStart = Date.now();
    // Call player ticks

    for (let id in this.entities) {
      let entity = this.entities[id];
      entity.tick();
    }

    this.tickDelta = Date.now() - this.tickStart;
    this.currentTime += this.tickDelta;
  }

  getEntity(id) {
    let entityByID;
    Object.values(this.entities).forEach(entity => {
      if (entity.id == id) entityByID = entity;
    });
    return entityByID;
  }

  getGameState() {
    state = [];
    for (let id in this.entities) {
      let entity = this.entities[id];
      state.push(entity.data);
    }

    return state;
  }

  getEntityByName(name) {
    let entityByName;
    Object.values(this.entities).forEach(entity => {
      if (entity.name == name) entityByName = entity;
    });
    return entityByName;
  }

  getEntityByNoaID(id) {
    let entityByNoaID;
    Object.values(this.entities).forEach(entity => {
      if (entity.noaEntityId == id) entityByNoaID = entity;
    });

    return entityByNoaID;
  }

  getEntityBySocketID(id) {
    let entityBySocketID;
    Object.values(this.entities).forEach(entity => {
      if (entity.socketID == id) entityBySocketID = entity;
    });
    return entityBySocketID;
  }

  addEntity(data) {
    let entityType = data.type;
    if (entityType) {
      let entity = new BOX[entityType](data);
      return entity;
    } else {
      error('entity type not defined');
    }
  }

  removeEntity(id) {
    if (BOX.isClient) {
      //this.noa.entities.deleteEntity(this.getEntity(id).mainUnit.noaEntityId);
      delete this.entities[id];
    } else {
      let unitID = this.entities[id].mainUnit.id;
      // delete the player entity
      delete this.entities[id];
      // delete the unit entities
      delete this.entities[unitID];
    }
  }
}

/**
 //player
const playerEvent = new Player(noa, player);
// init event listener
playerEvent.playerEvent();
 */

/*

// Client side server logic for socket
export const socket = io("http://localhost:3000");
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
  socket.on("ballshoot", (position) => {
    console.log("ball shoot data", position);
    playerEvent.playerShootBall(position);
  });
});
**/

// Event listener for input of the user (createBlock, edit, movement)
//blockSelector(noa, socket);

module.exports = { Engine };
