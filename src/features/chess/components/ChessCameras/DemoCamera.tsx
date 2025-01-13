import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { MathUtils, PerspectiveCamera as TreePerspectiveCamera, Vector3 } from 'three';

const DemoCamera: React.FC = () => {
	const cameraRef = useRef<TreePerspectiveCamera>(null);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const states = [
		{ speed: 0.2, x: 10, z: 1, y: 2 },
		{ speed: 0.2, x: 15, z: 5, y: 4 },
		{ speed: 0.2, x: 8, z: 3, y: 3 },
		{ speed: 0.2, x: 12, z: 2, y: 5 },
	];

	const [activeState, setActiveState] = useState(0);
	const [_, setTargetPosition] = useState<Vector3>(new Vector3());

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveState(prev => (prev + 1) % states.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [states.length]);

	useEffect(() => {
		const state = states[activeState];
		setTargetPosition(new Vector3(state.x, state.y, state.z));
	}, [activeState, states]);

	useFrame(({ clock }) => {
		if (cameraRef.current) {
			const t = clock.getElapsedTime() * states[activeState].speed;
			const currentPosition = cameraRef.current.position;
			const targetX = Math.sin(t) * states[activeState].x;
			const targetZ = Math.cos(t) * states[activeState].z;
			const targetY = Math.max(states[activeState].y, 5 * Math.abs(Math.cos(t)));

			currentPosition.x = MathUtils.lerp(currentPosition.x, targetX, 0.05);
			currentPosition.z = MathUtils.lerp(currentPosition.z, targetZ, 0.05);
			currentPosition.y = MathUtils.lerp(currentPosition.y, targetY, 0.05);
			cameraRef.current.lookAt(0, 0, 0);
		}
	});

	return <PerspectiveCamera ref={cameraRef} makeDefault />;
};

export default DemoCamera;
