// Libraries
import * as THREE from 'three';

// Modules
import Scene from "helpers/modules/Scene";
import { noiseShader, simpleLambertVertexShader } from 'helpers/modules/ShaderChunks';

THREE.ShaderChunk.simple_lambert_vertex = simpleLambertVertexShader;

THREE.ShaderChunk.noise = noiseShader;

export const noise = (): void => {
    const scene = new Scene('#bg');

    scene.init();
    scene.animate();

    const vshader = `
        #include <noise>

        uniform float uTime;

        varying float vNoise;

        void main() {
            vNoise = turbulence(normal + uTime * 0.1);
            vec3 pos = position + normal * vNoise * 10.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `;

    const fshader = `
        uniform sampler2D uTex;

        varying float vNoise;

        void main() {
            vec2 uv = vec2(0.0, abs(fract(-vNoise * 1.3)));
            vec3 color = texture2D(uTex, uv).rgb;

            gl_FragColor = vec4( color, 1.0 );
        }
    `;

    const uniforms = {
        uTime: { value: 0.0 },
        uTex: { value: new THREE.TextureLoader().load("src/assets/explosion.png")}
      }

    const geometry = new THREE.IcosahedronGeometry(20, 20);

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vshader,
        fragmentShader: fshader,
        wireframe: false
      });

    const ball = new THREE.Mesh(geometry, material);

    ball.position.z = -40;

    scene.add(ball);

    const clock = new THREE.Clock();

    function update(){
        requestAnimationFrame(update);

        uniforms.uTime.value += clock.getDelta();

        scene.renderer!.render(scene.scene!, scene.camera!);
    }

    update();
}
