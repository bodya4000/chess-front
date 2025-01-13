import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC, ReactNode } from 'react';
import ChessModes from '../../enums/ChessModes';
import useApp from '../../hooks/reduxSelelectors/useApp';
import DemoCamera from '../ChessCameras/DemoCamera';
import GameCamera from '../ChessCameras/GameCamera';
import styles from './ChessCanvas.module.scss';

interface ChessCanvasProps {
	children: ReactNode;
}

const ChessCanvas: FC<ChessCanvasProps> = ({ children }) => {
	const { mode } = useApp();
	return (
		<>
			<div className={`${mode == ChessModes.DEMO ? styles.canvas__demo : ''}`}>
				<div className={`${styles.canvas} ${mode == ChessModes.DEMO ? styles.canvas__opacity : ''}`}>
					<Canvas>
						<ambientLight intensity={0.8} />
						<pointLight position={[10, 10, 10]} />
						<directionalLight position={[10, 10, 5]} intensity={2} castShadow />
						{mode == ChessModes.DEMO && <DemoCamera />}
						{mode != ChessModes.DEMO && <GameCamera />}
						{children}
						<OrbitControls
							makeDefault
							enableZoom={mode != ChessModes.DEMO}
							enableRotate={mode != ChessModes.DEMO}
							minDistance={15}
							maxDistance={30}
							maxPolarAngle={Math.PI / 2}
							minPolarAngle={0}
							target={[0, 0, 0]}
							enablePan={false}
							dampingFactor={1}
						/>
					</Canvas>
				</div>
			</div>
		</>
	);
};

export default ChessCanvas;
