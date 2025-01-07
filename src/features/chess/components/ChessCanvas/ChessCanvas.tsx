import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { FigurePositionProvider } from '../../contexts/FigurePositionsContext';
import { revertMove } from '../../state/ChessState';
import ChessBoard from '../ChessBoard/ChessBoard';
import styles from './ChessCanvas.module.scss';

const ChessCanvas: FC = () => {
	const dispatch = useDispatch();
	const revertClick = () => {
		console.log('revert click');
		dispatch(revertMove());
	};
	return (
		<FigurePositionProvider>
			<button onClick={revertClick} className={styles.revert}>
				Revert Move
			</button>
			<div className={styles.canvas}>
				<Canvas camera={{ position: [0, 15, -10], fov: 50 }}>
					<ambientLight intensity={2} />
					<pointLight position={[10, 10, 10]} />
					<directionalLight position={[10, 10, 5]} intensity={2} castShadow />

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
		</FigurePositionProvider>
	);
};

export default ChessCanvas;
