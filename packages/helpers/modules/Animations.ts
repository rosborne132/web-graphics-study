import * as THREE from 'three';

/**
 * Rotates an object on the x, y and z axis.
 * @param {Object} Shape to be rotated.
 * @example
 * rotate(torus);
 * @returns {Void}
 */
export const rotate = (shape: THREE.Mesh): void => {
    shape.rotation.x += 0.01;
    shape.rotation.y += 0.005;
    shape.rotation.z += 0.01;
}
