import { configureStore } from '@reduxjs/toolkit';
import ChessReducer from './features/chess/state/ChessState';

const store = configureStore({
	reducer: {
		chess: ChessReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
