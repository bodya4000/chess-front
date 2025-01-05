import { isMoveAllowed, isWithinBounds } from '../../utils/MoveHelper';
import Cell from '../Cell';
import Color from '../Color';
import Figure from './Figure';
import Figures from './Figures'

abstract class LinearMovingFigure extends Figure {
	constructor(cell: Cell, color: Color, figureName: Figures) {
		super(cell, color, figureName);
	}

	getFigureMoves(): Cell[] {
		const cell = this.getCell();
		const board = cell.getBoard();
		const figureMoves: Cell[] = [];

		for (const direction of this.getMoveDirections()) {
			let targetRow = cell.getRowPos();
			let targetCol = cell.getColPos();

			while (true) {
				targetRow += direction[0];
				targetCol += direction[1];

				if (!isWithinBounds(board, targetRow, targetCol)) {
					break;
				}

				const targetCell = board.getCell(targetRow, targetCol);

				if (isMoveAllowed(targetCell, this.getColor())) {
					figureMoves.push(targetCell);
				}
				if (targetCell.hasFigure()) {
					break;
				}
			}
		}

		return figureMoves;
	}

	protected abstract getMoveDirections(): number[][];
}

export default LinearMovingFigure;
