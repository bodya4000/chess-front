import Color from '../../models/enums/Color';
import { BoardView } from '../../types/BoardView';
import { CellView } from '../../types/CellView';

export type BotUpdateState = {
	board?: BoardView;
	isCheck?: boolean;
	isMate?: boolean;
	highlightedMoves?: CellView[];
	currentFigureCell?: CellView | null;
	turn?: Color;
	newPos?: number[] | null;
};
