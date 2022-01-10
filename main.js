import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
let scene, renderer, camera, model;

let credits = '"Super Meat Boy Free" (https://skfb.ly/6QUQn) by moxstudios is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).'
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGL1Renderer();
  const loader = new GLTFLoader();
  const light = new THREE.AmbientLight(0x404040, 100);

  // setting camera position
  camera.position.z = 15;

  // adding light to the scene
  scene.add(light);
  scene.background = new THREE.Color(0xFFFFFF);

  // setting up renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
  })

  // loading model
  loader.load("super_meat_boy_free/scene.gltf", (gltf) => {
    document.getElementById("container").style.display = "none";

    // adding renderer element to html body
    document.body.appendChild(renderer.domElement);

    // adding credits div
    const creditsElement = document.createElement("div");
    creditsElement.innerText = credits;
    creditsElement.className = "credits";

    document.body.append(creditsElement);

    model = gltf.scene;
    scene.add(model);
  });

  // add controls to model
  initModelControls();

  animate();
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function initModelControls() {
  document.addEventListener('mousemove', (event) => {
    if (model !== undefined) {
      let x = event.screenX, y = event.screenY;
      let w = window.innerWidth / 2;
      let h = window.innerHeight / 2;

      if (x >= 0 && x < window.innerWidth / 2) {
        model.rotation.y = -((w - x) / w);
      } else model.rotation.y = (x - w) / w;

      if (y >= 0 && y < window.innerHeight / 2) {
        model.rotation.x = - ((h - y) / h);
      } else model.rotation.x = (y - h) / h;
    }
  });

  document.addEventListener('touchmove', (event) => {
    
    if (model !== undefined) {
      let x = event.touches[0].clientX, y = event.touches[0].clientY;
      let w = window.innerWidth / 2;
      let h = window.innerHeight / 2;

      if (x >= 0 && x < window.innerWidth / 2) {
        model.rotation.y = -((w - x) / w);
      } else model.rotation.y = (x - w) / w;

      if (y >= 0 && y < window.innerHeight / 2) {
        model.rotation.x = - ((h - y) / h);
      } else model.rotation.x = (y - h) / h;
    }

  })
}

init();