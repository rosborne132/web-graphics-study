import * as THREE from 'three';

export const createBox = (width: number, height: number, depth: number): THREE.Mesh => {
    const boxGeometry = new THREE.BoxGeometry(width, height, depth);
    const boxMaterial = new THREE.MeshStandardMaterial();

    return new THREE.Mesh(boxGeometry, boxMaterial);
}