import Cell from './Cell';
import Figure from './figures/Figure';

class MoveInfo {
	readonly movedFigure: Figure;
	readonly capturedFigure: Figure | null;
	readonly startCell: Cell;
	readonly endCell: Cell;

	constructor(movedFigure: Figure, capturedFigure: Figure | null, startCell: Cell, endCell: Cell) {
		this.movedFigure = movedFigure;
		this.capturedFigure = capturedFigure;
		this.startCell = startCell;
		this.endCell = endCell;
	}
}

export default MoveInfo;
