import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC, ReactNode } from 'react';
import ChessModes from '../../enums/ChessModes';
import useApp from '../../hooks/reduxSelelectors/useApp';
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
					<Canvas camera={{ position: [2, 15, -30], fov: 50 }}>
						<ambientLight intensity={2} />
						<pointLight position={[10, 10, 10]} />
						<directionalLight position={[10, 10, 5]} intensity={2} castShadow />

						{children}

						<OrbitControls
							enableZoom={true} // Дозволити масштабування
							minDistance={15} // Мінімальна відстань до сцени
							maxDistance={30} // Максимальна відстань до сцени
							maxPolarAngle={Math.PI / 2} // Обмеження вертикального обертання (максимум 90°)
							minPolarAngle={0} // Обмеження вертикального обертання (мінімум 0°)
							target={[0, 0, 0]} // Центр обертання камери
							enablePan={false} // Заборонити пересування
						/>
					</Canvas>
				</div>
			</div>
		</>
	);
};

export default ChessCanvas;
