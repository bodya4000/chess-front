import Cell from '../Cell';
import Color from '../Color';
import Figures from './Figures';
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
