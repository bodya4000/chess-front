import { useGLTF } from '@react-three/drei';
import { FC, useEffect } from 'react';
import * as THREE from 'three';

interface ChessFigureProps {
	figure?: string;
	color: string;
	position: number[];
}

const ChessFigure: FC<ChessFigureProps> = ({ figure="pawn", color, position }) => {
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
	const scaleFactoredPosition = [position[0] / scaleFactor +0.1, position[1], position[2] / scaleFactor];

	useEffect(() => {
		clonedScene.traverse(child => {
			if (child instanceof THREE.Mesh) {
				if (child.material instanceof THREE.MeshStandardMaterial) {
					child.material = child.material.clone(); 
					child.material.color.set(color === 'white' ? '#f8f4e3' : 'red');
				}
			}
		});
	}, [clonedScene, color]);

	return (
		<primitive
			object={clonedScene} 
			scale={0.04}
			position={scaleFactoredPosition}
			castShadow
		/>
	);
};

export default ChessFigure;
