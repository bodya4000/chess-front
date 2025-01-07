import MoveValidator from '../../utils/MoveValidator'
import Cell from '../cell/Cell';
import Color from '../enums/Color';
import Figures from '../enums/Figures';
import Figure from './Figure';

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

			if (MoveValidator.isWithinBounds(board, targetRow, targetCol)) {
				const targetCell = board.getCell(targetRow, targetCol);
				if (MoveValidator.isMoveAllowed(targetCell, this.getColor())) {
					figureMoves.push(targetCell);
				}
			}
		});

		return figureMoves;
	}
}

export default Knight;
