import { useEffect, useRef, useState } from 'react';
import ChessModes from '../../features/chess/enums/ChessModes';

const useBoardAnimation = (mode: ChessModes) => {
	const rotationRef = useRef(0);
	const [rotation, setRotation] = useState(0); 
	const animationFrameRef = useRef<number | null>(null);

	useEffect(() => {
		if (mode === ChessModes.DEMO) {
			let lastUpdateTime = Date.now(); 

			const animate = () => {
				const now = Date.now();
				const deltaTime = now - lastUpdateTime;

				if (deltaTime > 60) { 
					rotationRef.current += 0.008;
					setRotation(rotationRef.current);
					lastUpdateTime = now;
				}

				animationFrameRef.current = requestAnimationFrame(animate);
			};

			animationFrameRef.current = requestAnimationFrame(animate);

			return () => {
				if (animationFrameRef.current !== null) {
					cancelAnimationFrame(animationFrameRef.current);
				}
			};
		}
	}, [mode]);

	return { rotation };
};

export default useBoardAnimation;
