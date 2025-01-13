import { FC, memo, useMemo } from 'react';
import BoardFactory from '../../models/board/BoardFactory';
import DefaultChessBoard from './DefaultChessBoard';

const DemoBoard: FC = memo(() => {
	const board = useMemo(() => BoardFactory.initializeBoardView(), []);
	return <DefaultChessBoard cells={board.cells} highlightedMoves={[]} />;
});

export default DemoBoard;
