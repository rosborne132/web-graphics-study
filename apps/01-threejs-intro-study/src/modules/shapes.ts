// Libraries
import * as THREE from 'three';

// Modules
import { brickTexture, normalMapTexture } from './textures';

/**
 * Creates a torus object.
 *
 * @returns {Object} Torus object
 */
export const createTorus = () => {
    // Torus shape
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    // Materials are wrapping paper for geometries
    const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });

    return new THREE.Mesh(geometry, material);
}

/**
 * Creates a sphere object.
 *
 * @returns {Object} Sphere object
 */
export const createSphere = () => {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    return new THREE.Mesh(geometry, material);
}

/**
 * Creates a box object with a brick texture.
 *
 * @returns {Object} Box object
 */
export const createBrick = () => new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshStandardMaterial({ map: brickTexture, normalMap: normalMapTexture })
)


