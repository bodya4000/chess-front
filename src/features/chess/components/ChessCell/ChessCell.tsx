import { FC } from 'react';
import { useDispatch } from 'react-redux';
import ChessModes from '../../enums/ChessModes';
import useApp from '../../hooks/reduxSelelectors/useApp';
import useSingleChessBoard from '../../hooks/reduxSelelectors/useChess';
import { getHighlightMoves, makeMove, setNewPos } from '../../state/SingleChessBoardSlice';
import { CellView } from '../../types/CellView';
import ChessFigure from '../ChessFigure/ChessFigure';

interface ChessCellProps {
	cell: CellView;
	highlighted?: boolean;
	position: [number, number, number];
}

const ChessCell: FC<ChessCellProps> = ({ cell, highlighted, position }) => {
	const dispatch = useDispatch();
	const { mode } = useApp();
	const { turn, currentFigureCell } = useSingleChessBoard();

	const move = () => {
		if (highlighted && currentFigureCell) {
			const { row, col } = cell;
			const cellSize = 1.5;
			const targetPosition: [number, number, number] = [(col - currentFigureCell.col) * cellSize, 0.2, (row - currentFigureCell.row) * cellSize];
			dispatch(setNewPos(targetPosition));
			setTimeout(() => {
				dispatch(makeMove({ row, col }));
				dispatch(setNewPos(null))
			}, 300);
		}
	};

	const onClick = () => {
		if (mode !== ChessModes.DEMO) {
			if (turn === cell.figure?.color) {
				// fixme: this thing works only for singleChessBoard
				dispatch(getHighlightMoves({ row: cell.row, col: cell.col }));
			} else {
				move();
			}
		}
	};

	return (
		<mesh onClick={onClick} key={`${cell.row}-${cell.col}`} position={position}>
			<boxGeometry args={[1.5, 0.35, 1.5]} />
			<meshStandardMaterial color={highlighted ? 'yellow' : cell.color} />
			{cell.figure && <ChessFigure figureCell={currentFigureCell} id={cell.figure.id} figure={cell.figure.type} color={cell.figure.color} />}
		</mesh>
	);
};

export default ChessCell;
