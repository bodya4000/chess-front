import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/chess/state/AppSlice';
import BotChessBoardReducer from './features/chess/state/BotChessBoardSlice';
import ChessGameReducer from './features/chess/state/ChessGameSlice';

const store = configureStore({
	reducer: {
		chessGame: ChessGameReducer,
		botChessBoard: BotChessBoardReducer,
		app: appReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
