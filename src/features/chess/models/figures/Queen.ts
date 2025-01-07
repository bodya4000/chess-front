import Cell from '../cell/Cell';
import Color from '../enums/Color';
import Figures from '../enums/Figures';
import LinearMovingFigure from './LinearMovingFigure';

class Queen extends LinearMovingFigure {
	static MOVES: number[][] = [
		[1, 0], // Move up
		[-1, 0], // Move down
		[0, 1], // Move right
		[0, -1], // Move left
		[1, 1], // Move diagonally up-right
		[1, -1], // Move diagonally up-left
		[-1, 1], // Move diagonally down-right
		[-1, -1], // Move diagonally down-left
	];

	constructor(cell: Cell, color: Color) {
		super(cell, color, Figures.Queen);
	}

	protected getMoveDirections(): number[][] {
		return Queen.MOVES;
	}
}

export default Queen;
