import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ChessModes from '../enums/ChessModes';

interface ChessState {
	mode: ChessModes;
}

const initialState: ChessState = {
	mode: ChessModes.DEMO,
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setMode(state, action: PayloadAction<ChessModes>) {
			state.mode = action.payload;
		},
	},
});

export const { setMode } = appSlice.actions;
export default appSlice.reducer;
