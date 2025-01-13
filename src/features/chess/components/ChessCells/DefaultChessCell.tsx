import { FC, memo } from 'react';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import useResponsiveBoardValues from '../../hooks/useResponsiveBoardValues';
import { CellView } from '../../types/CellView';
import ChessFigure from '../ChessFigure/ChessFigure';

interface DefaultChessCellProps {
	onClick: () => void;
	cell: CellView;
	currentFigureCell: CellView | null;
	highlighted?: boolean;
	position: [number, number, number];
}

const DefaultChessCell: FC<DefaultChessCellProps> = memo(
	({ onClick, cell, currentFigureCell, highlighted, position }) => {
		const { pawnPromotionInfo } = useChessGame();
		const onClickWithDisableCheck = () => {
			if (!pawnPromotionInfo) {
				onClick();
			}
		};
		const { cellSize } = useResponsiveBoardValues();

		return (
			<mesh onClick={onClickWithDisableCheck} key={`${cell.row}-${cell.col}`} position={position}>
				<boxGeometry args={[cellSize, 0.35, cellSize]} />
				<meshStandardMaterial color={highlighted ? 'yellow' : cell.color} />
				{cell.figure && <ChessFigure figureCell={currentFigureCell} id={cell.figure.id} figure={cell.figure.type} color={cell.figure.color} />}
			</mesh>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.cell === nextProps.cell &&
			prevProps.currentFigureCell === nextProps.currentFigureCell &&
			prevProps.highlighted === nextProps.highlighted &&
			prevProps.position[0] === nextProps.position[0] &&
			prevProps.position[1] === nextProps.position[1] &&
			prevProps.position[2] === nextProps.position[2]
		);
	}
);

export default DefaultChessCell;
