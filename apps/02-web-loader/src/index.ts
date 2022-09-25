// Libraries
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';


// Modules
import Scene from "helpers/modules/Scene";

const scene = new Scene('#bg');

scene.init();
scene.animate();

const loader = new GLTFLoader();
// const fbxLoader = new FBXLoader();

loader.load(
    'src/assets/mug.glb',
    object => {
        object.scene.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        scene.add(object.scene);
    }
);

// fbxLoader.load(
//     'src/assets/teamug.fbx',
//     object => {
//         scene.add(object);
//     }
// );