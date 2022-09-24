// Libraries
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Modules
import { rotate } from './modules/animations'
import { createBrick, createSphere, createTorus } from './modules/shapes';
import { spaceTexture } from './modules/textures';

// Scenes are containers that hold all cameras, objects and lights.
const scene = new THREE.Scene();

// To see our objects we need a camera.
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Renders are needed to render the graphics to the scene.
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

const torus = createTorus()
const brick = createBrick();

scene.add(torus, brick);

// Light is needed when we are viewing a non mesh shape.
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight, pointLight);

// Creates a viewable element on the page to show where the light source is.
const lightHelper = new THREE.PointLightHelper(pointLight);

// Creates a viewable grid on the page to show where elements are in relation to the grid.
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Takes in inputs from the mouse and updates the camera.
const controls = new OrbitControls(camera, renderer.domElement);

// Fill the scene with stars.
Array(200).fill().forEach(() => {
    const star = createSphere();
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z);
    scene.add(star);
})

scene.background = spaceTexture;

// Recursive method to rerender the screen whenever anything changes within the scene.
const animate = () => {
    requestAnimationFrame(animate);

    rotate(torus);

    controls.update();

    renderer.render(scene, camera);
}

animate();