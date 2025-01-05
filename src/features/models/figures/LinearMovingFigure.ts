import MoveValidator from '../../utils/MoveValidator';
import Cell from '../cell/Cell';
import Color from '../enums/Color';
import Figures from '../enums/Figures';
import Figure from './Figure';

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

				if (!MoveValidator.isWithinBounds(board, targetRow, targetCol)) {
					break;
				}

				const targetCell = board.getCell(targetRow, targetCol);

				if (MoveValidator.isMoveAllowed(targetCell, this.getColor())) {
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
