import { FC } from 'react';
import BoardFactory from '../../models/board/BoardFactory';
import DefaultChessBoard from './DefaultChessBoard';

const DemoBoard: FC = () => {
	const board = BoardFactory.initializeBoardView();
	return <DefaultChessBoard cells={board.cells} highlightedMoves={[]} />;
};

export default DemoBoard;
