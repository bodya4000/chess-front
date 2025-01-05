import { isMoveAllowed, isWithinBounds } from '../../utils/MoveHelper';
import Cell from '../Cell';
import Color from '../Color';
import Figure from './Figure';
import Figures from './Figures'

class Knight extends Figure {
	private static readonly MOVES: number[][] = [
		[-2, -1],
		[-2, 1],
		[2, -1],
		[2, 1],
		[-1, -2],
		[-1, 2],
		[1, -2],
		[1, 2],
	];

	constructor(cell: Cell, color: Color) {
		super(cell, color, Figures.Knight);
	}

	getFigureMoves(): Cell[] {
		const cell = this.getCell();
		const board = cell.getBoard();
		const figureMoves: Cell[] = [];

		Knight.MOVES.forEach(([rowOffset, colOffset]) => {
			const targetRow = cell.getRowPos() + rowOffset;
			const targetCol = cell.getColPos() + colOffset;

			if (isWithinBounds(board, targetRow, targetCol)) {
				const targetCell = board.getCell(targetRow, targetCol);
				if (isMoveAllowed(targetCell, this.getColor())) {
					figureMoves.push(targetCell);
				}
			}
		});

		return figureMoves;
	}
}

export default Knight;
