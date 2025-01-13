import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import deepEqual from 'fast-deep-equal';
import { FC, memo, ReactNode } from 'react';
import ChessModes from '../../enums/ChessModes';
import useApp from '../../hooks/reduxSelelectors/useApp';
import useOnlineChessBoard from '../../hooks/reduxSelelectors/useOnlineChessBoard';
import DemoCamera from '../ChessCameras/DemoCamera';
import GameCamera from '../ChessCameras/GameCamera';
import styles from './ChessCanvas.module.scss';

interface ChessCanvasProps {
	children: ReactNode;
}

const ChessCanvas: FC<ChessCanvasProps> = memo(
	({ children }) => {
		const { mode } = useApp();
		const { waitingConnection } = useOnlineChessBoard();
		return (
			<>
				<div className={`${mode == ChessModes.DEMO || (mode == ChessModes.ONLINE && waitingConnection) ? styles.canvas__demo : ''}`}>
					<div className={`${styles.canvas} ${mode == ChessModes.DEMO || (mode == ChessModes.ONLINE && waitingConnection) ? styles.canvas__opacity : ''}`}>
						<Canvas>
							<ambientLight intensity={0.8} />
							<pointLight position={[10, 10, 10]} />
							<directionalLight position={[10, 10, 5]} intensity={2} castShadow />
							{mode == ChessModes.DEMO && <DemoCamera />}
							{mode != ChessModes.DEMO && <GameCamera />}
							{children}

						</Canvas>
					</div>
				</div>
			</>
		);
	},
	(prevProps, nextProps) => deepEqual(prevProps, nextProps)
);

export default ChessCanvas;
