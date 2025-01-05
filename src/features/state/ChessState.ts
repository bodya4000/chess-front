import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Color from '../models/Color';
import Figures from '../models/figures/Figures';
import King from '../models/figures/King';
import Pawn from '../models/figures/Pawn';
import MoveInfo from '../models/MoveInfo';
import BoardService from '../services/BoardService';
import CheckmateAnalyzer from '../services/CheckmateAnalyzer';
import { BoardView } from '../types/BoardView';
import { CellView } from '../types/CellView';
import GameHelper from '../utils/GameHelper';
import { getEnPassantCapturedCell, isEnPassantMove } from '../utils/MoveHelper';
import TypesHelper from '../utils/TypesHelper';

const checkmateAnalyzer = CheckmateAnalyzer;
const boardService = BoardService;

interface ChessState {
	board: BoardView | null;
	isCheck: boolean;
	isMate: boolean;
	highlightedMoves: CellView[];
	currentFigureCell: CellView | null;
	turn: Color;
}

const initialState: ChessState = {
	board: boardService.getSerializedBoard() as BoardView,
	isCheck: false,
	isMate: false,
	highlightedMoves: [],
	currentFigureCell: null,
	turn: Color.WHITE,
};

const chessSlice = createSlice({
	name: 'chess',
	initialState,
	reducers: {
		getHighlightMoves(state, action: PayloadAction<{ row: number; col: number }>) {
			const { row, col } = action.payload;
			const board = boardService.getBoard();
			const figure = board.getCell(row, col).getFigure();
			if (figure != null) {				
				state.highlightedMoves = checkmateAnalyzer.getMovesWithoutCheck(board, figure).map(cell => TypesHelper.serializeCell(cell));
				state.currentFigureCell = TypesHelper.serializeCell(board.getCell(row, col));
				state.board = boardService.getSerializedBoard();
			}
		},

		makeMove(state, action: PayloadAction<{ row: number; col: number }>) {
			const { row, col } = action.payload;
			const board = boardService.getBoard();

			if (state.currentFigureCell) {
				const startFigureCell = board.getCell(state.currentFigureCell?.row, state.currentFigureCell?.col);
				const moveTo = board.getCell(row, col);
				let possibleOpponentFigure = moveTo.getFigure();
				const figure = startFigureCell.getFigure();
				if (figure != null) {
					if (isEnPassantMove(figure, moveTo)) {
						possibleOpponentFigure = getEnPassantCapturedCell(figure, moveTo)?.getFigure() ?? null;
					}
					GameHelper.emulateMove(figure, moveTo);
					state.highlightedMoves = [];
					state.turn = state.turn === Color.WHITE ? Color.BLACK : Color.WHITE;
					board.setLastMove(new MoveInfo(figure, possibleOpponentFigure, startFigureCell, moveTo));
					if (figure.getFigureName() == Figures.Pawn) {
						const pawn = figure as Pawn;
						if (!pawn.didAnyMove()) {
							pawn.justDidFirstMove();
							board.setPawnThatJustDidTwoCellMove(pawn);
						}
					} else if (figure.getFigureName() == Figures.King) {
						const king = figure as King;
						if (!king.didAnyMove()) king.justDidFirstMove();
						board.setPawnThatJustDidTwoCellMove(null);
					} else {
						board.setPawnThatJustDidTwoCellMove(null);
					}
					state.board = boardService.getSerializedBoard();
					if (checkmateAnalyzer.isCheck(board, figure.getOpponentColor())) {
						if (checkmateAnalyzer.isMate(board, figure.getOpponentColor())) {
							alert("mate!")
						} else {
							alert("check!")
						}
					}
				}
			}
		},

		revertMove(state) {
			const board = boardService.getBoard();
			const moveInfo = board.getLastMove();
			console.debug(board.getLastMove());

			if (moveInfo) {
				const { movedFigure, capturedFigure, startCell, endCell } = moveInfo;
				GameHelper.revertMove(movedFigure, endCell, startCell, capturedFigure);
				state.turn = state.turn == Color.WHITE ? Color.BLACK : Color.WHITE;
				state.board = boardService.getSerializedBoard();
			}
		},
	},
});

export const { getHighlightMoves, makeMove, revertMove } = chessSlice.actions;

export default chessSlice.reducer;
