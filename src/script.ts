//@types/ammo
///<reference path="./ammo/ammo.d.ts"/>

//styles import
import "./style.scss";

import * as THREE from "three";
import { menuHelper } from "./ui/button-actions";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { voxelMap } from "./components/voxelMap";
import { box } from "./components/box";
// import { getFramePerSecond } from "./utils/utils";

//menu helper
menuHelper();

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("lightblue");

// Canvas
const canvas: HTMLCanvasElement = document.querySelector(".root");

// The cell sizes
const cellSize: number = 150;

// Sizes
const sizes: {
  width: number;
  height: number;
} = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const fov: number = 75;
const aspect: number = sizes.width / sizes.height;
const near: number = 0.1;
const far: number = 1000.1;

// Add the Voxel Map
voxelMap(scene, cellSize);

// Box
const boxPlayer = box();
scene.add(boxPlayer);

// Light
const ambiantLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambiantLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 5, 9);
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(114.21428960237601, 71.80326447920699, 149.86937728311378);

const controls = new OrbitControls(camera, canvas);
controls.target.set(114.21428960237601, 71.80326447920699, 148.86937728311378);
controls.update();

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

const moveDirection = { left: 0, right: 0, forward: 0, back: 0 };

function setupEventHandlers() {
  window.addEventListener("keydown", handleKeyDown, false);
  window.addEventListener("keyup", handleKeyUp, false);
}

function handleKeyDown(e: any) {
  let keyCode = e.keyCode;

  switch (keyCode) {
    case 87: //W: FORWARD
      moveDirection.forward = 1;
      break;

    case 83: //S: BACK
      moveDirection.back = 1;
      break;

    case 65: //A: LEFT
      moveDirection.left = 1;
      break;

    case 68: //D: RIGHT
      moveDirection.right = 1;
      break;
  }
}

function handleKeyUp(e: any) {
  let keyCode = e.keyCode;

  switch (keyCode) {
    case 87: //FORWARD
      moveDirection.forward = 0;
      break;

    case 83: //BACK
      moveDirection.back = 0;
      break;

    case 65: //LEFT
      moveDirection.left = 0;
      break;

    case 68: //RIGHT
      moveDirection.right = 0;
      break;
  }
}

setupEventHandlers();

// Responsive
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update Renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const gameloop = () => {
  renderer.render(scene, camera);

  // Move the cube
  boxPlayer.position.z -= moveDirection.forward / 4;
  boxPlayer.position.z += moveDirection.back / 4;
  boxPlayer.position.x -= moveDirection.left / 4;
  boxPlayer.position.x += moveDirection.right / 4;

  // Move the camera
  camera.position.z -= moveDirection.forward / 4;
  camera.position.z += moveDirection.back / 4;
  camera.position.x -= moveDirection.left / 4;
  camera.position.x += moveDirection.right / 4;

  window.requestAnimationFrame(gameloop);
};

gameloop();
