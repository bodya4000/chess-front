import { useEffect, useState } from 'react';

const useFigureAnimation = (doRotation: boolean) => {
	const [rotation, setRotation] = useState(0);

	useEffect(() => {
		if (doRotation) {
			let frameId: number;
			const animate = () => {
				setRotation(prev => prev + 0.002);
				frameId = requestAnimationFrame(animate);
			};
			frameId = requestAnimationFrame(animate);
			return () => cancelAnimationFrame(frameId);
		}
	}, [doRotation]);

	return { rotation };
};

export default useFigureAnimation;
