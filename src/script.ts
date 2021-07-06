//styles import
import "./style.scss";

//import modules
import * as THREE from "three";
import { menuHelper } from "./ui/button-actions";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { box } from "./components/box";
import { plane } from "./components/plane";
import { getFramePerSecond } from "./utils/utils";

//menu helper
menuHelper();

// Canvas
const canvas: HTMLCanvasElement = document.querySelector(".root");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Mesh
const mesh = box();
scene.add(mesh);

// Plane
scene.add(plane());

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.target.y = 2
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Responsive
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Upadte the camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Full Screen
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

let counterTick = 0;
let totalSecond = 0;
// Animate
const animate = () => {
  controls.update();

  // Render
  renderer.render(scene, camera);
  const start = window.performance.now();

  // Call tick again on the next frame
  window.requestAnimationFrame(animate);

  const end = window.performance.now();

  //Calling function with counter ticker
  if (counterTick >= 60) {
    getFramePerSecond(totalSecond);
    counterTick = 0;
    totalSecond = 0;
  }
  counterTick++;
  totalSecond += end - start;
};

animate();
