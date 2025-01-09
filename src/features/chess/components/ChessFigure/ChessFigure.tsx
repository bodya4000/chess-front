import { animated } from '@react-spring/three';
import { FC } from 'react';
import useFigureAnimation from '../../hooks/chessFigure/useFigureAnimation';
import useFigureQuality from '../../hooks/chessFigure/useFigureQuality';
import useInitialFigurePosition from '../../hooks/chessFigure/useInitialFigurePosition';
import useLoad3DFigureScene from '../../hooks/chessFigure/useLoad3DFigureScene';
import useSaveFigurePosition from '../../hooks/chessFigure/useSaveFigurePosition';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import { CellView } from '../../types/CellView';

interface ChessFigureProps {
	id: number;
	figure: string;
	color: string;
	figureCell: CellView | null;
}

const ChessFigure: FC<ChessFigureProps> = ({ figure, color, id, figureCell }) => {
	const { newPos } = useChessGame();
	const { scene } = useLoad3DFigureScene(figure);
	const [springProps, api] = useInitialFigurePosition();
	useFigureQuality(scene, color);
	useFigureAnimation({ newPos, figureCell, id, api });
	useSaveFigurePosition(api);
	return <animated.primitive object={scene} position={springProps.position} scale={1} castShadow />;
};

export default ChessFigure;
