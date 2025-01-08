import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ChessModes from '../enums/ChessModes';

interface ChessState {
	mode: ChessModes;
	new3DPosition: [number, number, number] | null;
}

const initialState: ChessState = {
	mode: ChessModes.DEMO,
	new3DPosition: null,
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setMode(state, action: PayloadAction<ChessModes>) {
			state.mode = action.payload;
		},

		setNewPos(state, action: PayloadAction<[number, number, number] | null>) {
			state.new3DPosition = action.payload;
		},
	},
});

export const { setMode, setNewPos } = appSlice.actions;
export default appSlice.reducer;
