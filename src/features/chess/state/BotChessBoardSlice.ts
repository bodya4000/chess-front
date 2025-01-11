import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Color from '../models/enums/Color';
import { boardService, chessJsService } from '../services/services';
import CoordinationPositionMapper from '../utils/CoordinationPositionMapper';
import ModelsSerializer from '../utils/ModelsSerializer';
import { setCurrentFigureCell, setNewPos } from './ChessGameSlice';

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
		const targetPosition: number[] = CoordinationPositionMapper.get3DPositionMove({ figureCell: { row: figureCell.row, col: figureCell.col }, moveCell: { row: moveCell.row, col: moveCell.col } });
		const currentFigureCellView = ModelsSerializer.serializeCell(boardService.getBoard().getCell(figureCell.row, figureCell.col));
		thunkAPI.dispatch(setCurrentFigureCell(currentFigureCellView));
		thunkAPI.dispatch(setNewPos(targetPosition));
		return { figureCell, moveCell };
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

export const { setDepth, setupColorsForUserAndBot } = botChessSlice.actions;
export default botChessSlice.reducer;
