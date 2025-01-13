import { FC } from 'react';
import { useDispatch } from 'react-redux';
import ChessModes from '../../enums/ChessModes';
import useApp from '../../hooks/reduxSelelectors/useApp';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import { getHighlightMoves } from '../../state/ChessGameSlice';
import { CellView } from '../../types/CellView';
import ChessLogic from '../../utils/ChessLogic';
import DefaultChessCell from './DefaultChessCell';
import useResponsiveBoardValues from '../../hooks/useResponsiveBoardValues'

interface ChessCellProps {
	cell: CellView;
	highlighted?: boolean;
	position: [number, number, number];
}

const SingleChessCell: FC<ChessCellProps> = ({ cell, highlighted, position }) => {
	const dispatch = useDispatch();
	const { mode } = useApp();
	const { turn, currentFigureCell } = useChessGame();
	const { cellSize } = useResponsiveBoardValues();

	const move = () => {
		ChessLogic.handleUIStateForFigureMove(highlighted, currentFigureCell, cell, dispatch,cellSize);
	};

	const onClick = () => {
		if (mode == ChessModes.SINGLE) {
			if (turn === cell.figure?.color) {
				dispatch(getHighlightMoves({ row: cell.row, col: cell.col }));
			} else if (currentFigureCell && highlighted) {
				move();
			}
		}
	};

	return <DefaultChessCell onClick={onClick} cell={cell} currentFigureCell={currentFigureCell} highlighted={highlighted} position={position} />;
};

export default SingleChessCell;
