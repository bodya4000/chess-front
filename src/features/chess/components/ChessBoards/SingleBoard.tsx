import { FC } from 'react';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import DefaultChessBoard from './DefaultChessBoard';

const SingleBoard: FC = () => {
	const { board, highlightedMoves } = useChessGame();
	return <DefaultChessBoard cells={board.cells} highlightedMoves={highlightedMoves} />;
};

export default SingleBoard;
