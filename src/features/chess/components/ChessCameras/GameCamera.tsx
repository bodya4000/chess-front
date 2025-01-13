import { PerspectiveCamera } from '@react-three/drei';
import React, { memo, useRef } from 'react';
import { Vector3, PerspectiveCamera as TreePerspectiveCamera} from 'three';

const GameCamera: React.FC = memo(() => {
	const cameraRef = useRef<TreePerspectiveCamera>(null);
	const whitePosition = new Vector3(0, 15, -15);
	// const blackPosition = new Vector3(0, 15, 15);

	if (cameraRef.current) {
		cameraRef.current.position.copy(whitePosition);
		cameraRef.current.lookAt(0, 0, 0);
	}

	return <PerspectiveCamera ref={cameraRef} makeDefault />;
});

export default GameCamera;
