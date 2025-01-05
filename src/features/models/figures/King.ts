import { isMoveAllowed, isWithinBounds } from '../../utils/MoveHelper';
import Board from '../Board';
import Cell from '../Cell';
import Color from '../Color';
import Figure from './Figure';
import Figures from './Figures';

class King extends Figure {
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

	private isFirstMove: boolean = true;

	constructor(cell: Cell, color: Color) {
		super(cell, color, Figures.King);
	}

	public justDidFirstMove() {
		this.isFirstMove = false;
	}

	public didAnyMove() {
		return !this.isFirstMove;
	}

	getFigureMoves(): Cell[] {
		const cell = this.getCell();
		const board = cell.getBoard();
		const figureMoves: Cell[] = [];

		this.getMoveDirections().forEach(([rowOffset, colOffset]) => {
			const targetRow = cell.getRowPos() + rowOffset;
			const targetCol = cell.getColPos() + colOffset;

			if (isWithinBounds(board, targetRow, targetCol)) {
				const targetCell = board.getCell(targetRow, targetCol);

				if (isMoveAllowed(targetCell, this.getColor())) {
					figureMoves.push(targetCell);
				}
			}
		});

		if (!this.didAnyMove()) {
			this.addLockingMove(figureMoves, board, cell, 'SHORT');
			this.addLockingMove(figureMoves, board, cell, 'LONG');
		}

		return figureMoves;
	}

	private addLockingMove(figureMoves: Cell[], board: Board, cell: Cell, type: 'SHORT' | 'LONG'): void {
		const isShort = type === 'SHORT';

		const rookCoordinates = isShort ? (this.getColor() === Color.WHITE ? [0, 7] : [7, 7]) : this.getColor() === Color.WHITE ? [0, 0] : [7, 0];

		const rookCell = board.getCell(rookCoordinates[0], rookCoordinates[1]);
		const rook = rookCell.getFigure();

		if (!rook) return;

		const step = isShort ? 1 : -1;
		const intermediateCell = board.getCell(cell.getRowPos(), cell.getColPos() + step);
		const targetCell = board.getCell(cell.getRowPos(), cell.getColPos() + step * 2);

		if (rook.getFigureMoves().includes(intermediateCell)) {
			figureMoves.push(targetCell);
		}
	}

	protected getMoveDirections(): number[][] {
		return King.MOVES;
	}
}

export default King;
