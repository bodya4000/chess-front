import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Color from '../models/enums/Color';
import { boardService, checkmateAnalyzer } from '../services/services';
import { BoardView } from '../types/BoardView';
import { CellView } from '../types/CellView';
import { Coordinates } from '../types/Coordinates';
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
}

const initialState: ChessState = {
	board: boardService.getSerializedBoard(),
	isCheck: false,
	isMate: false,
	highlightedMoves: [],
	currentFigureCell: null,
	turn: Color.WHITE,
	newPos: null,
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
export const finalizeMove = createAsyncThunk('chess/finalizeMove', async ({ figureCell, moveCell }: Coordinates, thunkAPI) => {
	const board = boardService.getBoard();
	const from = board.getCell(figureCell.row, figureCell.col);
	const to = board.getCell(moveCell.row, moveCell.col);
	const figure = from.getFigure();

	if (figure) {
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
	},
});

export const { getHighlightMoves, makeMove, revertMove, setCurrentFigureCell, setNewPos, updateGameState } = chessGameSlice.actions;
export default chessGameSlice.reducer;
