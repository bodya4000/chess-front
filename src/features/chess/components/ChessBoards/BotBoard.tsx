import { FC, useEffect } from 'react';
import useBotChessBoard from '../../hooks/reduxSelelectors/useBotChessBoard';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Color from '../../models/enums/Color';
import { getBotMove, setupColorsForUserAndBot } from '../../state/BotChessBoardSlice';
import { completeMove } from '../../state/ChessGameSlice';
import { debounce } from '../../utils/Functions';
import DefaultChessBoard from './DefaultChessBoard';

const BotBoard: FC = () => {
	const { botColor } = useBotChessBoard();
	const { board, highlightedMoves } = useChessGame();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setupColorsForUserAndBot());
	}, [dispatch]);

	useEffect(() => {
		if (botColor == Color.WHITE) {
			dispatch(getBotMove()).then(result => {
				if (result.payload) {
					debounce(() => dispatch(completeMove(result.payload)));
				}
			});
		}
	}, [botColor, dispatch]);
	return <DefaultChessBoard cells={board.cells} highlightedMoves={highlightedMoves} />;
};

export default BotBoard;
