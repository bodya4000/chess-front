import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Color from '../models/enums/Color';
import Figures from '../models/enums/Figures';
import FigureFactory from '../models/figures/FigureFactory';
import { boardService, checkmateAnalyzer, chessJsService } from '../services/services';
import { BoardView } from '../types/BoardView';
import { CellView } from '../types/CellView';
import { OpponentMoveInfo } from '../types/OpponentMoveInfo';
import { PawnPromotionInfo } from '../types/PawnPromotionInfo';
import ChessLogic from '../utils/ChessLogic';
import TypesHelper from '../utils/ModelsSerializer';
import { BotUpdateState } from './types/BotUpdateState';
import { updateTurn } from './utils/helpers';

export interface ChessState {
	board: BoardView;
	isCheck: boolean;
	isMate: boolean;
	highlightedMoves: CellView[];
	currentFigureCell: CellView | null;
	turn: Color;
	newPos: number[] | null;

	pawnPromotionInfo: PawnPromotionInfo | null;
}

const initialState: ChessState = {
	board: boardService.getSerializedBoard(),
	isCheck: false,
	isMate: false,
	highlightedMoves: [],
	currentFigureCell: null,
	turn: Color.WHITE,
	newPos: null,

	pawnPromotionInfo: null,
};

/**
 * Handles the completion of a move triggered by a bot or an online player.
 * This method assumes the move has already been validated on the bot or player's side,
 * so it skips local validation and directly updates the game state.
 *
 * Workflow:
 * - Retrieves the board and the cells involved in the move (`from` and `to`).
 * - Processes the move logic using `ChessLogic.processGameStateForFigureMove`.
 * - Dispatches the updated game state to Redux.
 *
 * @param {Coordinates} payload - Contains the starting and target cell coordinates of the move.
 * @param {object} thunkAPI - The Redux Toolkit `thunkAPI` object, used to dispatch actions.
 */
export const completeMove = createAsyncThunk('chess/completeMove', async ({ coordinates, promotionFigureName }: OpponentMoveInfo, thunkAPI) => {
	const { figureCell, moveCell } = coordinates;
	const board = boardService.getBoard();
	const from = board.getCell(figureCell.row, figureCell.col);
	const to = board.getCell(moveCell.row, moveCell.col);
	let figure = from.getFigure();

	if (figure) {
		chessJsService.userMakesMove(coordinates, promotionFigureName);
		if (promotionFigureName) {
			figure = FigureFactory.createFigure(promotionFigureName, to, figure.getColor());
			to.setFigure(figure);
			const pawnCell = board.getCell(from.getRowPos(), from.getColPos());
			pawnCell.setFigure(null);
		}
		ChessLogic.processGameStateForFigureMove(board, from, to, figure, figure.getColor(), (newState: Partial<ChessState>) => {
			thunkAPI.dispatch(updateGameState(newState as BotUpdateState));
		});
	}
});

const chessGameSlice = createSlice({
	name: 'chess',
	initialState,
	reducers: {
		getHighlightMoves(state, action: PayloadAction<{ row: number; col: number }>) {
			const { row, col } = action.payload;
			const board = boardService.getBoard();
			const figure = board.getCell(row, col).getFigure();
			if (figure) {
				state.highlightedMoves = checkmateAnalyzer.getMovesWithoutCheck(board, figure).map(cell => TypesHelper.serializeCell(cell));
				state.currentFigureCell = TypesHelper.serializeCell(board.getCell(row, col));
				state.board = boardService.getSerializedBoard(); // during d
			}
		},

		makeMove(state, action: PayloadAction<{ row: number; col: number }>) {
			const { row, col } = action.payload;
			const board = boardService.getBoard();
			if (!state.currentFigureCell) return;

			const from = board.getCell(state.currentFigureCell.row, state.currentFigureCell.col);
			const to = board.getCell(row, col);
			const figure = from.getFigure();
			if (figure) {
				chessJsService.userMakesMove({ figureCell: { row: from.getRowPos(), col: from.getColPos() }, moveCell: { row, col } });
				ChessLogic.processGameStateForFigureMove(board, from, to, figure, state.turn, (newState: Partial<ChessState>) => {
					Object.assign(state, newState);
				});
			}
		},

		revertMove(state) {
			const board = boardService.getBoard();
			const moveInfo = board.getLastMove();
			if (!moveInfo) return;
			const { figure, to, from, captured } = moveInfo;
			boardService.revertMove(figure, to, from, captured);
			state.turn = updateTurn(state.turn);
			state.board = boardService.getSerializedBoard();
		},

		setCurrentFigureCell(state, action: PayloadAction<CellView>) {
			state.currentFigureCell = action.payload;
		},

		setNewPos(state, action: PayloadAction<number[] | null>) {
			state.newPos = action.payload;
		},

		updateGameState(state, action: PayloadAction<BotUpdateState>) {
			return { ...state, ...action.payload };
		},

		setPawnPromotionInfo(state, action: PayloadAction<PawnPromotionInfo | null>) {
			state.pawnPromotionInfo = action.payload;
		},
		setFigureInsteadOfPawn(state, action: PayloadAction<Figures>) {
			if (state.pawnPromotionInfo) {
				const board = boardService.getBoard();
				const cell = board.getCell(state.pawnPromotionInfo.row, state.pawnPromotionInfo.col);
				const coordinates = state.pawnPromotionInfo.fromCoordinates;
				const pawnCell = board.getCell(coordinates.figureCell.row, coordinates.figureCell.col);
				const promotingFigure = FigureFactory.createFigure(action.payload, cell, state.pawnPromotionInfo.color);
				chessJsService.userMakesMove(coordinates, action.payload);
				cell.setFigure(promotingFigure);
				pawnCell.setFigure(null);
				state.pawnPromotionInfo = null;
				state.highlightedMoves = [];
				state.turn = updateTurn(state.turn);
				state.board = boardService.getSerializedBoard();
			}
		},
	},
});

export const { getHighlightMoves, makeMove, revertMove, setCurrentFigureCell, setNewPos, updateGameState, setPawnPromotionInfo, setFigureInsteadOfPawn } = chessGameSlice.actions;
export default chessGameSlice.reducer;
