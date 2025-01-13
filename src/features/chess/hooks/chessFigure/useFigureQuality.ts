import { useEffect } from 'react';
import { Group, Mesh, MeshStandardMaterial, Object3DEventMap, Scene } from 'three';

const useFigureQuality = (clonedScene: Group<Object3DEventMap> | Scene, color: string) => {
	useEffect(() => {
		clonedScene.traverse(child => {
			if (child instanceof Mesh) {
				if (child.material instanceof MeshStandardMaterial) {
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
