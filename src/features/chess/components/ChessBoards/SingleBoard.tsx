import { FC } from 'react';
import useSingleChessBoard from '../../hooks/reduxSelelectors/useChess';
import DefaultChessBoard from './DefaultChessBoard';

const SingleBoard: FC = () => {
	const { board, highlightedMoves } = useSingleChessBoard();
	return <DefaultChessBoard cells={board.cells} highlightedMoves={highlightedMoves} />;
};

export default SingleBoard;
