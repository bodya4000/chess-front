import { useSpring } from '@react-spring/three';
import CoordinationPositionMapper from '../../utils/CoordinationPositionMapper';

const useInitialFigurePosition = () => {
	return useSpring(() => ({
		position: CoordinationPositionMapper.getInit3DPosition(),
		config: { mass: 1, tension: 170, friction: 26 },
	}));
};

export default useInitialFigurePosition;
