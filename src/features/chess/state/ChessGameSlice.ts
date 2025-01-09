import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Color from '../models/enums/Color';
import { boardService, checkmateAnalyzer, chessJsService, moveAnalyzer } from '../services/services';
import { BoardView } from '../types/BoardView';
import { CellView } from '../types/CellView';
import ChessHelper from '../utils/ChessHelper';
import TypesHelper from '../utils/ModelsSerializer';
import { BotUpdateState } from './types/BotUpdateState';
import ChessLogic from './utils/ChessLogic';

interface ChessState {
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

const updateTurn = (turn: Color): Color => (turn === Color.WHITE ? Color.BLACK : Color.WHITE);

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
			const startFigureCell = board.getCell(state.currentFigureCell.row, state.currentFigureCell.col);
			const moveTo = board.getCell(row, col);
			const figure = startFigureCell.getFigure();
			if (!figure) return;
			let possibleOpponentFigure = moveTo.getFigure();
			if (moveAnalyzer.isEnPassantMove(figure, moveTo)) {
				possibleOpponentFigure = ChessHelper.getEnPassantCapturedCell(figure, moveTo)?.getFigure() ?? null;
			}
			chessJsService.userMakesMove({ row: state.currentFigureCell.row, col: state.currentFigureCell.col }, { row, col });
			ChessLogic.handleFigureMove(board, figure, startFigureCell, moveTo, possibleOpponentFigure);
			state.highlightedMoves = [];
			state.board = boardService.getSerializedBoard();
			state.turn = updateTurn(state.turn);
			ChessLogic.checkForCheckmate(board, figure, state);
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
			const { board, highlightedMoves, turn, isCheck, isMate } = action.payload;
			state.board = board;
			state.highlightedMoves = highlightedMoves;
			state.turn = turn;
			state.isCheck = isCheck;
			state.isMate = isMate;
		},
	},
});

export const { getHighlightMoves, makeMove, revertMove, setCurrentFigureCell, setNewPos, updateGameState } = chessGameSlice.actions;
export default chessGameSlice.reducer;
