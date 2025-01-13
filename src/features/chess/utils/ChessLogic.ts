import { Dispatch } from '@reduxjs/toolkit';
import Board from '../models/board/Board';
import Cell from '../models/cell/Cell';
import Color from '../models/enums/Color';
import Figures from '../models/enums/Figures';
import Figure from '../models/figures/Figure';
import King from '../models/figures/King';
import Pawn from '../models/figures/Pawn';
import MoveInfo from '../models/value-objects/MoveInfo';
import { boardService, checkmateAnalyzer, moveAnalyzer } from '../services/services';
import { ChessState, makeMove, setNewPos, setPawnPromotionInfo } from '../state/ChessGameSlice';
import { updateTurn } from '../state/utils/helpers';
import { CellView } from '../types/CellView';
import ChessHelper from './ChessHelper';
import CoordinationPositionMapper from './CoordinationPositionMapper';
import { debounce } from './Functions';

class ChessLogic {
	// handles each case if it's king, pawn, or default figure
	static handleFigureMove(board: Board, figure: Figure, from: Cell, to: Cell, possibleOpponentFigure: Figure | null) {
		boardService.emulateMove(figure, to);
		board.setLastMove(new MoveInfo(figure, possibleOpponentFigure, from, to));

		switch (figure.getFigureName()) {
			case Figures.Pawn:
				this.handlePawnMove(board, figure as Pawn);
				break;
			case Figures.King:
				this.handleKingMove(board, figure as King);
				break;
			default:
				this.handleRegularMove(board);
		}
	}

	private static handlePawnMove(board: Board, figure: Pawn) {
		if (!figure.didAnyMove()) {
			figure.justDidFirstMove();
			board.setPawnThatJustDidTwoCellMove(figure);
		}
	}

	private static handleKingMove(board: Board, figure: King) {
		if (!figure.didAnyMove()) figure.justDidFirstMove();
		board.setPawnThatJustDidTwoCellMove(null);
	}

	private static handleRegularMove(board: Board) {
		board.setPawnThatJustDidTwoCellMove(null);
	}

	// checks checkmate state
	static checkForCheckmate<T extends { isCheck: boolean; isMate: boolean }>(board: Board, figure: Figure, newState: T) {
		if (checkmateAnalyzer.isCheck(board, figure.getOpponentColor())) {
			newState.isCheck = true;
			newState.isMate = checkmateAnalyzer.isMate(board, figure.getOpponentColor());
		}
	}

	/**
	 * Handles the move logic on the **component level**.
	 * This method manages UI interactions, including calculating the 3D position for a move
	 * and dispatching relevant Redux actions to update the state.
	 *
	 * @param highlighted - Whether the current cell is highlighted as a valid move
	 * @param currentFigureCell - The cell of the currently selected figure
	 * @param cell - The target cell for the move
	 * @param dispatch - The Redux dispatch function to trigger state updates
	 */
	static handleUIStateForFigureMove(highlighted: boolean | undefined, currentFigureCell: CellView | null, cell: CellView, dispatch: Dispatch) {
		if (highlighted && currentFigureCell) {
			const { row, col } = cell;
			const coordinates = {
				figureCell: { row: currentFigureCell.row, col: currentFigureCell.col },
				moveCell: { row, col },
			};
			const targetPosition: number[] = CoordinationPositionMapper.get3DPositionMove(coordinates);
			dispatch(setNewPos(targetPosition));
			if (currentFigureCell.figure?.type == Figures.Pawn) {
				if (row == 0 || row == 7) {
					const pawnColor = row == 0 ? Color.BLACK : Color.WHITE;
					dispatch(
						setPawnPromotionInfo({
							col,
							row,
							color: pawnColor,
							figure: null,
							fromCoordinates: coordinates,
						})
					);
					return;
				}
			}
			debounce(() => {
				dispatch(makeMove({ row, col }));
				dispatch(setNewPos(null));
			});
		}
	}
	/**
	 * Processes the move logic on the **Redux level**.
	 * This method focuses on the game state, updating the board and turn,
	 * and handling advanced chess rules like en passant and checkmate detection.
	 *
	 * @param board - The current state of the chess board
	 * @param from - The starting cell of the figure
	 * @param to - The target cell for the move
	 * @param figure - The figure being moved (null if no figure present)
	 * @param turn - The current player's turn color
	 * @param stateUpdater - A function to apply updates to the Redux state
	 */
	static processGameStateForFigureMove(board: Board, from: Cell, to: Cell, figure: Figure | null, turn: Color, stateUpdater: (newState: Partial<ChessState>) => void) {
		if (!figure) return;

		let possibleOpponentFigure = to.getFigure();
		if (moveAnalyzer.isEnPassantMove(figure, to)) {
			possibleOpponentFigure = ChessHelper.getEnPassantCapturedCell(figure, to)?.getFigure() ?? null;
		}
		ChessLogic.handleFigureMove(board, figure, from, to, possibleOpponentFigure);
		const newState = {
			highlightedMoves: [],
			board: boardService.getSerializedBoard(),
			turn: updateTurn(turn),
			isCheck: false,
			isMate: false,
			currentFigureCell: null,
		};
		ChessLogic.checkForCheckmate(board, figure, newState);
		stateUpdater(newState);
	}
}

export default ChessLogic;
