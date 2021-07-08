//@types/ammo
///<reference path="./ammo/ammo.d.ts"/>

//styles import
import "./style.scss";

import * as THREE from "three";
import { menuHelper } from "./ui/button-actions";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { voxelMap } from "./components/voxelMap";
// import { getFramePerSecond } from "./utils/utils";

//menu helper
menuHelper();

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

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
const far: number = 500;

// Camera
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-cellSize * 0.3, cellSize * 0.8, -cellSize * 0.3);
scene.add(camera);

// Controles
const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
controls.target.set(cellSize / 2, cellSize / 3, cellSize / 2);
controls.update();

// Add the Voxel Map
voxelMap(scene, cellSize);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

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

  window.requestAnimationFrame(gameloop);
};

gameloop();
