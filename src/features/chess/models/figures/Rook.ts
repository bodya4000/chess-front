import Cell from '../cell/Cell';
import Color from '../enums/Color';
import Figures from '../enums/Figures';
import LinearMovingFigure from './LinearMovingFigure';

class Rook extends LinearMovingFigure {
	static MOVES: number[][] = [
		[1, 0], // Move up
		[-1, 0], // Move down
		[0, 1], // Move right
		[0, -1], // Move left
	];

	constructor(cell: Cell, color: Color) {
		super(cell, color, Figures.Rook);
	}

	protected getMoveDirections(): number[][] {
		return Rook.MOVES;
	}
}

export default Rook;
