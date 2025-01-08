import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Board from '../models/board/Board';
import Color from '../models/enums/Color';
import Figures from '../models/enums/Figures';
import King from '../models/figures/King';
import Pawn from '../models/figures/Pawn';
import MoveInfo from '../models/value-objects/MoveInfo';
import BoardRepository from '../repositories/BoardRepository';
import BoardService from '../services/BoardService';
import CheckmateAnalyzer from '../services/CheckmateAnalyzer';
import MoveAnalyzer from '../services/MoveAnalyzer';
import MoveEmulator from '../services/MoveEmulator';
import { BoardView } from '../types/BoardView';
import { CellView } from '../types/CellView';
import ChessHelper from '../utils/ChessHelper';
import TypesHelper from '../utils/ModelsSerializer';

// Setup dependencies
const boardRepository = new BoardRepository();
const moveAnalyzer = new MoveAnalyzer();
const moveEmulator = new MoveEmulator(moveAnalyzer);
const boardService = new BoardService(boardRepository, moveEmulator);
const checkmateAnalyzer = new CheckmateAnalyzer(moveEmulator, moveAnalyzer);

interface ChessState {
	oldBoard: BoardView | null;
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
	oldBoard: boardService.getSerializedBoard(),
	isCheck: false,
	isMate: false,
	highlightedMoves: [],
	currentFigureCell: null,
	turn: Color.WHITE,
	newPos: null,
};

const updateTurn = (turn: Color): Color => (turn === Color.WHITE ? Color.BLACK : Color.WHITE);

const handlePawnMove = (board: Board, figure: Pawn) => {
	if (!figure.didAnyMove()) {
		figure.justDidFirstMove();
		board.setPawnThatJustDidTwoCellMove(figure);
	}
};

const handleKingMove = (board: Board, figure: King) => {
	if (!figure.didAnyMove()) figure.justDidFirstMove();
	board.setPawnThatJustDidTwoCellMove(null);
};

const handleRegularMove = (board: Board) => {
	board.setPawnThatJustDidTwoCellMove(null);
};

const singleChessBoardSlice = createSlice({
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
				state.board = boardService.getSerializedBoard();
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

			boardService.emulateMove(figure, moveTo);
			board.setLastMove(new MoveInfo(figure, possibleOpponentFigure, startFigureCell, moveTo));

			switch (figure.getFigureName()) {
				case Figures.Pawn:
					handlePawnMove(board, figure as Pawn);
					break;
				case Figures.King:
					handleKingMove(board, figure as King);
					break;
				default:
					handleRegularMove(board);
			}

			state.highlightedMoves = [];
			state.turn = updateTurn(state.turn);
			state.board = boardService.getSerializedBoard();

			if (checkmateAnalyzer.isCheck(board, figure.getOpponentColor())) {
				state.isCheck = true;
				state.isMate = checkmateAnalyzer.isMate(board, figure.getOpponentColor());
				alert(state.isMate ? 'mate!' : 'check!');
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

		refreshBoard(state) {
			state.oldBoard = state.board;
		},

		setNewPos(state, action: PayloadAction<number[] | null>) {
			state.newPos = action.payload;
		},
	},
});

export const { getHighlightMoves, makeMove, revertMove, refreshBoard, setNewPos } = singleChessBoardSlice.actions;
export default singleChessBoardSlice.reducer;
