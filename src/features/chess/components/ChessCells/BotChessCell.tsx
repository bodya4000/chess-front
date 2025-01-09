import { FC } from 'react';
import useBotChessBoard from '../../hooks/reduxSelelectors/useBotChessBoard';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { completeBotMove, getBotMove } from '../../state/BotChessBoardSlice';
import { getHighlightMoves, makeMove, setNewPos } from '../../state/ChessGameSlice';
import { CellView } from '../../types/CellView';
import CoordinationPositionMapper from '../../utils/CoordinationPositionMapper';
import DefaultChessCell from './DefaultChessCell';

interface ChessCellProps {
	cell: CellView;
	highlighted?: boolean;
	position: [number, number, number];
}

const BotChessCell: FC<ChessCellProps> = ({ cell, highlighted, position }) => {
	const dispatch = useAppDispatch();
	const { userColor } = useBotChessBoard();
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
		if (turn === userColor) {
			if (turn === cell.figure?.color) {
				dispatch(getHighlightMoves({ row: cell.row, col: cell.col }));
			} else if (highlighted) {
				move();
				setTimeout(() => {
					dispatch(getBotMove()).then(result => result.payload && setTimeout(() => dispatch(completeBotMove(result.payload)), 300));
				}, 300);
			}
		}
	};

	return <DefaultChessCell onClick={onClick} cell={cell} currentFigureCell={currentFigureCell} highlighted={highlighted} position={position} />;
};

export default BotChessCell;
