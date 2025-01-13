import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ChessModes from '../enums/ChessModes';

interface ChessState {
	mode: ChessModes;
	cameraControl: boolean;
}

const initialState: ChessState = {
	mode: ChessModes.DEMO,
	cameraControl: true,
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setMode(state, action: PayloadAction<ChessModes>) {
			state.mode = action.payload;
		},
		changeCameraControl(state) {
			state.cameraControl = !state.cameraControl;
		},
	},
});

export const { setMode, changeCameraControl } = appSlice.actions;
export default appSlice.reducer;
