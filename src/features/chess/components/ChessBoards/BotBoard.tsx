import { FC, useEffect } from 'react';
import useBotChessBoard from '../../hooks/reduxSelelectors/useBotChessBoard';
import useChessGame from '../../hooks/reduxSelelectors/useChessGame';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Color from '../../models/enums/Color';
import { completeBotMove, getBotMove, setupColorsForUserAndBot } from '../../state/BotChessBoardSlice';
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
					dispatch(completeBotMove(result.payload));
				}
			});
		}
	}, [botColor, dispatch]);
	return <DefaultChessBoard cells={board.cells} highlightedMoves={highlightedMoves} />;
};

export default BotBoard;

