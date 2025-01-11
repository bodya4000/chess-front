import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Color from '../models/enums/Color';

interface OnlineChessState {
	waitingConnection: boolean;
	userColor: Color;
	userSession: string | null;
	opponentSession: string | null;
}

export interface OnlineChessUpdate {
	waitingConnection?: boolean;
	userColor?: Color;
	userSession?: string | null;
	opponentSession?: string | null;
}

const initialState: OnlineChessState = {
	waitingConnection: true,
	userColor: Color.WHITE,
	userSession: null,
	opponentSession: null,
};

const onlineChessSlice = createSlice({
	name: 'onlineChess',
	initialState,
	reducers: {
		setUserColor(state, action: PayloadAction<Color>) {
			state.userColor = action.payload;
		},

		setIfWaiting(state, action: PayloadAction<boolean>) {
			state.waitingConnection = action.payload;
		},

		setUserSession(state, action: PayloadAction<string>) {
			state.userSession = action.payload;
		},
		setOpponentSession(state, action: PayloadAction<string>) {
			state.opponentSession = action.payload;
		},

		establishConnection(state, action: PayloadAction<OnlineChessUpdate>) {
			return { ...state, ...action.payload };
		},
	},
});

export const { setUserColor, setIfWaiting,establishConnection } = onlineChessSlice.actions;
export default onlineChessSlice.reducer;
