import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/chess/state/AppSlice';
import SingleChessBoardReducer from './features/chess/state/SingleChessBoardSlice';

const store = configureStore({
	reducer: {
		singleChessBoard: SingleChessBoardReducer,
		app: appReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
