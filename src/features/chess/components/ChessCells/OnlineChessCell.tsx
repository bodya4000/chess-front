import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import useOnlineChessBoard from '../../hooks/reduxSelelectors/useOnlineChessBoard';
import Figures from '../../models/enums/Figures';
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

const OnlineChessCell: FC<ChessCellProps> = memo(
	({ cell, highlighted, position }) => {
		const dispatch = useDispatch();
		const { turn, currentFigureCell } = useChessGame();
		const { userColor, opponentSession } = useOnlineChessBoard();
		const move = () => {
			ChessLogic.handleUIStateForFigureMove(highlighted, currentFigureCell, cell, dispatch);
			if (highlighted && currentFigureCell) {
				if (currentFigureCell.figure?.type == Figures.Pawn) {
					if (cell.row == 0 || cell.row == 7) {
						return;
					}
				}
				const move = CoordinationPositionMapper.parseCellsMoveToString({ figureCell: { row: currentFigureCell.row, col: currentFigureCell.col }, moveCell: { row: cell.row, col: cell.col } });
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
	},
	(prevProps, nextProps) =>
		prevProps.cell == nextProps.cell && prevProps.highlighted == nextProps.highlighted && prevProps.position[0] == nextProps.position[0] && prevProps.position[1] == nextProps.position[1] && prevProps.position[2] == nextProps.position[2]
);
export default OnlineChessCell;
