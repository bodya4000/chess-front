import Color from '../../models/enums/Color';
import { BoardView } from '../../types/BoardView';

export type BotUpdateState = {
	highlightedMoves: [];
	turn: Color;
	board: BoardView;
	isCheck: boolean;
	isMate: boolean;
};
