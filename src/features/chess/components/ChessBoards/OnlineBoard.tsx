import { FC } from 'react';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import usePlayerConnection from '../../hooks/usePlayerConnection';
import DefaultChessBoard from './DefaultChessBoard';

const OnlineBoard: FC = () => {
	const { board, highlightedMoves } = useChessGame();	
	usePlayerConnection();
	return <DefaultChessBoard cells={board.cells} highlightedMoves={highlightedMoves} />;
};

export default OnlineBoard;
