import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Color from '../models/enums/Color';
import { boardService, chessJsService } from '../services/services';
import CoordinationPositionMapper from '../utils/CoordinationPositionMapper';
import ModelsSerializer from '../utils/ModelsSerializer';
import { setCurrentFigureCell, setNewPos, updateGameState } from './ChessGameSlice';
import { BotUpdateState } from './types/BotUpdateState';
import ChessLogic from './utils/ChessLogic'

interface BotChessState {
	botColor: Color;
	userColor: Color;
	complexity: number;
}

const initialState: BotChessState = {
	botColor: Color.BLACK,
	userColor: Color.WHITE,
	complexity: 1,
};

export const getBotMove = createAsyncThunk('botChess/getBotMove', async (_, thunkAPI) => {
	const response = await chessJsService.botMakesMove();
	if (response) {
		const { figureCell, moveCell } = response;
		const targetPosition: number[] = CoordinationPositionMapper.get3DPositionMove({ row: figureCell.row, col: figureCell.col }, { row: moveCell.row, col: moveCell.col });
		const currentFigureCellView = ModelsSerializer.serializeCell(boardService.getBoard().getCell(figureCell.row, figureCell.col));
		thunkAPI.dispatch(setCurrentFigureCell(currentFigureCellView));
		thunkAPI.dispatch(setNewPos(targetPosition));
		return { figureCell, moveCell };
	}
});

export const completeBotMove = createAsyncThunk('botChess/completeBotMove', async ({ figureCell, moveCell }: { figureCell: { row: number; col: number }; moveCell: { row: number; col: number } }, thunkAPI) => {
	const board = boardService.getBoard();
	const from = board.getCell(figureCell.row, figureCell.col);
	const to = board.getCell(moveCell.row, moveCell.col);
	const figure = from.getFigure();
	const possibleOpponentFigure = to.getFigure();

	if (figure) {
		chessJsService.userMakesMove({ row: figureCell.row, col: figureCell.col }, { row: moveCell.row, col: moveCell.col });
		ChessLogic.handleFigureMove(board, figure, from, to, possibleOpponentFigure);

		const newState = {
			highlightedMoves: [],
			turn: figure.getOpponentColor(),
			board: boardService.getSerializedBoard(),
			isCheck: false,
			isMate: false,
		};
		ChessLogic.checkForCheckmate(board, figure, newState);
		thunkAPI.dispatch(updateGameState(newState as BotUpdateState));
	}
});

const botChessSlice = createSlice({
	name: 'botChess',
	initialState,
	reducers: {
		setDepth(state, action: PayloadAction<number>) {
			state.complexity = action.payload;
			chessJsService.setDepth(action.payload);
		},
		setupColorsForUserAndBot(state) {
      const isUserWhite = Math.random() < 0.6;
      state.userColor = isUserWhite ? Color.WHITE : Color.BLACK;
      state.botColor = isUserWhite ? Color.BLACK : Color.WHITE;
    },
	},
});

export const { setDepth,setupColorsForUserAndBot } = botChessSlice.actions;
export default botChessSlice.reducer;
