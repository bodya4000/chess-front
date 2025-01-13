import { SpringRef } from '@react-spring/three';
import { useEffect } from 'react';

const useSaveFigurePosition = (api: SpringRef<{ scale: number; position: [number, number, number] }>) => {
	useEffect(() => {
		api.start({ position: [0, 0.2, 0] });
	}, [api]);
};

export default useSaveFigurePosition;
