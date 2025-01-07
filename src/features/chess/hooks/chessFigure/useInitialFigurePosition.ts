import { useSpring } from '@react-spring/three';

const useInitialFigurePosition = () => {
	return useSpring(() => ({
		position: [0, 0.2, 0],
		config: { mass: 1, tension: 170, friction: 26 },
	}));
};

export default useInitialFigurePosition;
