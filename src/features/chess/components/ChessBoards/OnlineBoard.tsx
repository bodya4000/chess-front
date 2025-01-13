import { FC, memo, useEffect } from 'react';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { init } from '../../state/ChessGameSlice';
import DefaultChessBoard from './DefaultChessBoard';
import usePlayerConnection from '../../hooks/usePlayerConnection'

const OnlineBoard: FC = memo(() => {
	const { board, highlightedMoves } = useChessGame();
	const dispatch = useAppDispatch();
	usePlayerConnection();
	useEffect(() => {
		dispatch(init());
	}, [dispatch]);
	if (board) return <DefaultChessBoard cells={board.cells} highlightedMoves={highlightedMoves} />;
});

export default OnlineBoard;
