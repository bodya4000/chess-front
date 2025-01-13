import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { MathUtils, PerspectiveCamera as TreePerspectiveCamera, Vector3 } from 'three';
import ChessModes from '../../enums/ChessModes';
import useApp from '../../hooks/reduxSelelectors/useApp';
import useBotChessBoard from '../../hooks/reduxSelelectors/useBotChessBoard';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import useOnlineChessBoard from '../../hooks/reduxSelelectors/useOnlineChessBoard';
import Color from '../../models/enums/Color';

const GameCamera: React.FC = memo(() => {
	const { mode, cameraControl } = useApp();
	const { turn } = useChessGame();
	const { userColor } = useBotChessBoard();
	const { userColor: onlineUserColor } = useOnlineChessBoard();

	const cameraRef = useRef<TreePerspectiveCamera>(null);

	const whitePosition = useMemo(() => new Vector3(0, 15, -10), []);
	const blackPosition = useMemo(() => new Vector3(0, 15, 10), []);
	const cameraPosition = useMemo(() => {
		if (mode === ChessModes.SINGLE) {
			return turn === Color.WHITE ? whitePosition : blackPosition;
		} else if (mode === ChessModes.BOT) {
			return userColor === Color.WHITE ? whitePosition : blackPosition;
		} else if (mode === ChessModes.ONLINE) {
			return onlineUserColor === Color.WHITE ? whitePosition : blackPosition;
		}
		return whitePosition;
	}, [mode, turn, userColor, onlineUserColor, whitePosition, blackPosition]);

	const [currentPosition, setCurrentPosition] = useState<Vector3>(cameraPosition);

	useEffect(() => {
		setCurrentPosition(cameraPosition);
	}, [cameraPosition]);

	useFrame(() => {
		if (cameraRef.current) {
			const targetPosition = currentPosition;
			const newPosition = new Vector3(MathUtils.lerp(cameraRef.current.position.x, targetPosition.x, 1), MathUtils.lerp(cameraRef.current.position.y, targetPosition.y, 1), MathUtils.lerp(cameraRef.current.position.z, targetPosition.z, 1));
			cameraRef.current.position.copy(newPosition);
			cameraRef.current.lookAt(0, 0, 0);
		}
	});

	if (cameraControl) {
		return <PerspectiveCamera ref={cameraRef} makeDefault />;
	}

	return <OrbitControls position={[0,0,0]} makeDefault enableZoom={true} enableRotate={true} minDistance={15} maxDistance={30} maxPolarAngle={Math.PI / 2} minPolarAngle={0} target={[0, 0, 0]} enablePan={false} dampingFactor={1} />;
});

export default GameCamera;
