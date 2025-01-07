import { useEffect } from 'react';
import * as THREE from 'three';

const useFigureQuality = (clonedScene: THREE.Group<THREE.Object3DEventMap> | THREE.Scene, color: string) => {
	useEffect(() => {
		clonedScene.traverse(child => {
			if (child instanceof THREE.Mesh) {
				if (child.material instanceof THREE.MeshStandardMaterial) {
					child.material = child.material.clone();
					child.material.color.set(color === 'white' ? 'rgba(255, 249, 230)' : '#737373');
					child.material.metalness = 0.5;
					child.material.roughness = 0.05;
					child.material.envMapIntensity = 1.2;

					if (child.material.map) {
						child.material.map.anisotropy = 16;
					}
				}
			}
		});

		if (color === 'black') {
			clonedScene.rotation.set(0, Math.PI, 0);
		}
	}, [clonedScene, color]);
};

export default useFigureQuality;
