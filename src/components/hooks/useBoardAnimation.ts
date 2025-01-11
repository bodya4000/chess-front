import { useEffect, useState } from 'react';
import ChessModes from '../../features/chess/enums/ChessModes';

const useBoardAnimation = (mode: ChessModes) => {
	const [rotation, setRotation] = useState(0);
	useEffect(() => {
		if (mode === ChessModes.DEMO) {
			let frameId: number;
			const animate = () => {
				setRotation(prev => prev + 0.0025);
				frameId = requestAnimationFrame(animate);
			};
			frameId = requestAnimationFrame(animate);
			return () => cancelAnimationFrame(frameId);
		}
	}, [mode]);

	return { rotation };
};

export default useBoardAnimation;
