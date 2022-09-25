// Libraries
import * as THREE from 'three';

// Modules
import Scene from "helpers/modules/Scene";

export const basic = (): void => {
    const scene = new Scene('#bg');

    scene.init();
    scene.animate();

    // Shaders are split into 2 components:
    // Vertex Shaders: Moves each vertex from local to clip coordinates (range -1, 1).
    const vshader = `
        uniform float time;
        uniform float radius;
        void main() {
            float delta = (sin(time) + 1.0) / 2.0;
            vec3 v = normalize(position) * radius;
            vec3 pos = mix(position, v, delta);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `;

    // Fragment Shaders: Set the color for each pixel.
    const fshader = `
        void main() {
            vec3 color = vec3(0.0);
            color.r = 0.5;
            color.g = 0.2;
            color.b = 0.4;
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    // Use uniforms to pass data between JavaScript and your shaders.
    const uniforms = {
        time: { value: 0.0 },
        radius: { value: 20.0 }
    }

    const geometry = new THREE.BoxGeometry(30, 30, 30, 10, 10, 10);

    const material = new THREE.ShaderMaterial({
        fragmentShader: fshader,
        transparent: true,
        vertexShader: vshader,
        uniforms,
        wireframe: true
    });

    const ball = new THREE.Mesh(geometry, material);

    ball.position.z = -40;

    scene.add(ball);

    const clock = new THREE.Clock();

    function update(){
        requestAnimationFrame(update);

        if (uniforms.time !== undefined) uniforms.time.value += clock.getDelta();

        scene.renderer(this.scene, this.camera);
    }

    update();
}
