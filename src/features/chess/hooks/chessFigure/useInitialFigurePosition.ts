import { useSpring } from '@react-spring/three';
import CoordinationPositionMapper from '../../utils/CoordinationPositionMapper';

export interface SpringApiProps {
	scale: number;
	position: [number, number, number];
}

const useInitialFigurePosition = (scale: number | undefined) => {
	return useSpring<SpringApiProps>(() => ({
		scale: scale || 1,
		position: CoordinationPositionMapper.getInit3DPosition(),
		config: { mass: 1, tension: 120, friction: 30 },
	}));
};

export default useInitialFigurePosition;
