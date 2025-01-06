import { useGLTF } from '@react-three/drei';
import { FC, useEffect } from 'react';
import * as THREE from 'three';

interface ChessFigureProps {
	figure: string;
	color: string;
	position: number[];
}

const ChessFigure: FC<ChessFigureProps> = ({ figure, color, position }) => {
	const modelPaths: Record<string, string> = {
		king: '/assets/models/king.glb',
		queen: '/assets/models/queen.glb',
		rook: '/assets/models/rook.glb',
		bishop: '/assets/models/bishop.glb',
		knight: '/assets/models/knight.glb',
		pawn: '/assets/models/pawn.glb',
	};

	const gltf = useGLTF(modelPaths[figure] || modelPaths.pawn);
	const clonedScene = gltf.scene.clone();

	const scaleFactor = 500;
	const scaleFactoredPosition = [position[0] / scaleFactor + 0.1, position[1], position[2] / scaleFactor];

	useEffect(() => {
		clonedScene.traverse(child => {
			if (child instanceof THREE.Mesh) {
				if (child.material instanceof THREE.MeshStandardMaterial) {
					child.material = child.material.clone();
					if (child.geometry.attributes.position) {
						const position = child.geometry.attributes.position;
						position.needsUpdate = true;
					}
					child.material.color.set(color === 'white' ? 'rgba(255, 249, 230)' : '#737373');

					child.material.metalness = 0.5; // Металевий ефект
					child.material.roughness = 0.05; // Зменшення шорсткості
					child.material.envMapIntensity = 1.2; // Інтенсивність освітлення

					if (child.material.map) {
						child.material.map.anisotropy = 16; // Підвищення анізотропії
					}
				}
			}
		});

		if (color === 'black') {
			clonedScene.rotation.set(0, Math.PI, 0); // Поворот чорних фігур
		}
	}, [clonedScene, color]);

	return <primitive object={clonedScene} scale={1} position={scaleFactoredPosition} castShadow />;
};

export default ChessFigure;
