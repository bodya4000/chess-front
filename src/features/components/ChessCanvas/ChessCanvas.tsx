import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC } from 'react';
import ChessBoard from '../ChessBoard/ChessBoard';
import styles from './ChessCanvas.module.scss';

const ChessCanvas: FC = () => {
	return (
		<div className={styles.canvas}>
			<Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
				<ambientLight intensity={3} />
				<pointLight position={[10, 10, 10]} />

				<ChessBoard />
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
	);
};

export default ChessCanvas;
