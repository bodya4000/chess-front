import { useSpring } from '@react-spring/three';
import CoordinationPositionMapper from '../../utils/CoordinationPositionMapper';

const useInitialFigurePosition = (scale: number | undefined) => {
	return useSpring(() => ({
		scale: scale ? scale : 1,
		position: CoordinationPositionMapper.getInit3DPosition(),
		config: { mass: 1, tension: 170, friction: 26 },
	}));
};

export default useInitialFigurePosition;
