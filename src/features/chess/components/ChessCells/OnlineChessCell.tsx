import { FC } from 'react';
import { useDispatch } from 'react-redux';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import useOnlineChessBoard from '../../hooks/reduxSelelectors/useOnlineChessBoard';
import { playerConnectionService } from '../../services/services';
import { getHighlightMoves } from '../../state/ChessGameSlice';
import { CellView } from '../../types/CellView';
import ChessLogic from '../../utils/ChessLogic';
import CoordinationPositionMapper from '../../utils/CoordinationPositionMapper';
import DefaultChessCell from './DefaultChessCell';

interface ChessCellProps {
	cell: CellView;
	highlighted?: boolean;
	position: [number, number, number];
}

const OnlineChessCell: FC<ChessCellProps> = ({ cell, highlighted, position }) => {
	const dispatch = useDispatch();
	const { turn, currentFigureCell } = useChessGame();
	const { userColor, opponentSession } = useOnlineChessBoard();
	const move = () => {
		ChessLogic.handleUIStateForFigureMove(highlighted, currentFigureCell, cell, dispatch);
		if (highlighted && currentFigureCell) {
			const move = CoordinationPositionMapper.parseCellsMoveToString({ figureCell: { row: currentFigureCell.row, col: currentFigureCell.col }, moveCell: { row: cell.row, col: cell.col } });
			console.log(`move: ${move}`);
			playerConnectionService.publish(`/app/player/move/${opponentSession}`, JSON.stringify({ move }));
		}
	};

	const onClick = () => {
		if (turn == userColor) {
			if (turn === cell.figure?.color) {
				dispatch(getHighlightMoves({ row: cell.row, col: cell.col }));
			} else if (currentFigureCell && highlighted) {
				move();
			}
		}
	};

	return <DefaultChessCell onClick={onClick} cell={cell} currentFigureCell={currentFigureCell} highlighted={highlighted} position={position} />;
};

export default OnlineChessCell;
