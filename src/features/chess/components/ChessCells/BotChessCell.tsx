import { FC } from 'react';
import useBotChessBoard from '../../hooks/reduxSelelectors/useBotChessBoard';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getBotMove } from '../../state/BotChessBoardSlice';
import { completeMove, getHighlightMoves } from '../../state/ChessGameSlice';
import { CellView } from '../../types/CellView';
import ChessLogic from '../../utils/ChessLogic';
import { debounce } from '../../utils/Functions';
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
		ChessLogic.handleUIStateForFigureMove(highlighted, currentFigureCell, cell, dispatch);
		debounce(() => {
			dispatch(getBotMove()).then(result => result.payload && debounce(() => dispatch(completeMove(result.payload))));
		});
	};

	const onClick = () => {
		if (turn === userColor) {
			if (turn === cell.figure?.color) {
				dispatch(getHighlightMoves({ row: cell.row, col: cell.col }));
			} else if (currentFigureCell && highlighted) {
				move();
			}
		}
	};

	return <DefaultChessCell onClick={onClick} cell={cell} currentFigureCell={currentFigureCell} highlighted={highlighted} position={position} />;
};

export default BotChessCell;
