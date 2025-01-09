import { FC } from 'react';
import { useDispatch } from 'react-redux';
import ChessModes from '../../enums/ChessModes';
import useApp from '../../hooks/reduxSelelectors/useApp';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import { getHighlightMoves, makeMove, setNewPos } from '../../state/ChessGameSlice';
import { CellView } from '../../types/CellView';
import CoordinationPositionMapper from '../../utils/CoordinationPositionMapper';
import DefaultChessCell from './DefaultChessCell';

interface ChessCellProps {
	cell: CellView;
	highlighted?: boolean;
	position: [number, number, number];
}

const SingleChessCell: FC<ChessCellProps> = ({ cell, highlighted, position }) => {
	const dispatch = useDispatch();
	const { mode } = useApp();
	const { turn, currentFigureCell } = useChessGame();
	const move = () => {
		if (highlighted && currentFigureCell) {
			const { row, col } = cell;
			const targetPosition: number[] = CoordinationPositionMapper.get3DPositionMove({ row: currentFigureCell.row, col: currentFigureCell.col }, { row, col });
			dispatch(setNewPos(targetPosition));
			setTimeout(() => {
				dispatch(makeMove({ row, col }));
				dispatch(setNewPos(null));
			}, 300);
		}
	};

	const onClick = () => {
		if (mode == ChessModes.SINGLE) {
			if (turn === cell.figure?.color) {
				dispatch(getHighlightMoves({ row: cell.row, col: cell.col }));
			} else {
				move();
			}
		}
	};

	return <DefaultChessCell onClick={onClick} cell={cell} currentFigureCell={currentFigureCell} highlighted={highlighted} position={position} />;
};

export default SingleChessCell;
