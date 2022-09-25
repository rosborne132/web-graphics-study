import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class Scene {
    camera: THREE.PerspectiveCamera | undefined;
    scene: THREE.Scene | undefined;
    id: string;
    fov: number;
    nearPlane: number;
    farPlane: number;
    renderer: THREE.WebGLRenderer | undefined;
    canvas: HTMLCanvasElement | THREE.OffscreenCanvas | undefined;
    clock: THREE.Clock | undefined;
    stats: Stats | undefined;
    controls: OrbitControls | undefined;
    ambientLight: THREE.AmbientLight | undefined;
    directionalLight: THREE.DirectionalLight | undefined;


    constructor(id: string) {
         // Core components.
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        // Camera params.
        this.fov = 45;
        this.nearPlane = 1;
        this.farPlane = 1000;
        this.id = id;

        // Additional components.
        this.clock = undefined;
        this.stats = undefined;
        this.controls = undefined;

        // Lights.
        this.ambientLight = undefined;
        this.directionalLight = undefined;
    }

    init() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        this.camera.position.z = 48;

        const canvas = document.querySelector(this.id) as HTMLCanvasElement;

        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        this.clock = new THREE.Clock();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.ambientLight.castShadow = true;
        this.scene.add(this.ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.castShadow = true;
        this.directionalLight.position.set(0, 32, 64);
        this.scene.add(this.directionalLight);

        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    add(element: THREE.Object3D) {
        this.scene?.add(element);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this?.stats?.update();
        this?.controls?.update();
    }

    enableStats() {
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);
    }

    onWindowResize() {
        this.camera!.aspect = window.innerWidth / window.innerHeight;
        this?.camera?.updateProjectionMatrix();
        this?.renderer?.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this?.renderer?.render(this.scene as THREE.Object3D, this.camera as THREE.Camera);
    }
}