import { animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import deepEqual from 'fast-deep-equal';
import React, { memo, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
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
		const isLargeScreen = useMediaQuery({ query: '(min-width: 901px)' });
		const isMediumScreen = useMediaQuery({ query: '(max-width: 900px) and (min-width: 768px)' });
		const isSmallScreen = useMediaQuery({ query: '(max-width: 767px) and (min-width: 489px)' });
		const isExtraSmallScreen = useMediaQuery({ query: '(max-width: 488px)' });

		const responsiveFigureScale = useMemo(() => {
			if (isLargeScreen) return scale;
			if (isMediumScreen) return scale * 0.8;
			if (isSmallScreen) return scale * 0.6;
			if (isExtraSmallScreen) return scale * 0.5;
			return scale;
		}, [isLargeScreen, scale, isMediumScreen, isSmallScreen, isExtraSmallScreen]);

		const { newPos } = useChessGame();
		const { scene } = useLoad3DFigureScene(figure);
		const [hovered, setHovered] = useState(false);
		const [springProps, api] = useInitialFigurePosition(responsiveFigureScale);
		useFigureQuality(scene, color);
		useFigureAnimation({ newPos, figureCell, id, api });
		useSaveFigurePosition(api);

		const meshRef = useRef<Mesh>(null);

		useFrame(() => {
			if (promoting && !hovered && meshRef.current?.rotation) {
				const rotationSpeed = figure === Figures.Queen ? 0.009 : 0.112;
				meshRef.current.rotation.y += rotationSpeed;
			}
		});

		const handlePointerOver = () => {
			if (promoting && !hovered) {
				setHovered(true);
				api.start({ scale: responsiveFigureScale * 1.2 });
			}
		};

		const handlePointerOut = () => {
			if (promoting && hovered) {
				setHovered(false);
				api.start({ scale: responsiveFigureScale });
			}
		};
		// @ts-expect-error: Type instantiation is excessively deep
		return <animated.primitive ref={meshRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} object={scene} position={springProps.position} scale={springProps.scale} castShadow />;
	},
	(prevProps, nextProps) => deepEqual(prevProps.figureCell, nextProps.figureCell) && deepEqual(prevProps.figure, nextProps.figure) && prevProps.promoting === nextProps.promoting && prevProps.scale === nextProps.scale
);

export default ChessFigure;
