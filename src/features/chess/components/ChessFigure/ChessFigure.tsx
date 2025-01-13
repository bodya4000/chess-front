import { animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import deepEqual from 'fast-deep-equal';
import React, { memo, useRef, useState } from 'react';
import { Mesh } from 'three';
import useFigureAnimation from '../../hooks/chessFigure/useFigureAnimation';
import useFigureQuality from '../../hooks/chessFigure/useFigureQuality';
import useInitialFigurePosition from '../../hooks/chessFigure/useInitialFigurePosition';
import useLoad3DFigureScene from '../../hooks/chessFigure/useLoad3DFigureScene';
import useSaveFigurePosition from '../../hooks/chessFigure/useSaveFigurePosition';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import Figures from '../../models/enums/Figures';
import { CellView } from '../../types/CellView';

interface ChessFigureProps {
	id: number;
	figure: string;
	color: string;
	figureCell: CellView | null;
	promoting?: boolean;
	scale?: number;
}

const ChessFigure: React.FC<ChessFigureProps> = memo(
	({ figure, color, id, figureCell, promoting, scale = 1 }) => {
		const { newPos } = useChessGame();
		const { scene } = useLoad3DFigureScene(figure);
		const [hovered, setHovered] = useState(false);
		const [springProps, api] = useInitialFigurePosition(scale);
		useFigureQuality(scene, color);
		useFigureAnimation({ newPos, figureCell, id, api });
		useSaveFigurePosition(api);

		const meshRef = useRef<Mesh>();
		useFrame(() => {
			if (promoting && !hovered && meshRef.current && meshRef.current.rotation) {
				meshRef.current.rotation.y += figure === Figures.Queen ? 0.009 : 0.112;
			}
		});

		const handlePointerOver = () => {
			if (promoting) {
				setHovered(true);
				api.start({ scale: scale * 1.2 });
			}
		};

		const handlePointerOut = () => {
			if (promoting) {
				setHovered(false);
				api.start({ scale });
			}
		};
		// @ts-expect-error: Type instantiation is excessively deep
		return <animated.primitive ref={meshRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} object={scene} position={springProps.position} scale={springProps.scale} castShadow />;
	},
	(prevProps, nextProps) => deepEqual(prevProps, nextProps)
);

export default ChessFigure;
