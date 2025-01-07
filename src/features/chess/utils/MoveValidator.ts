import Board from '../models/board/Board'
import Cell from '../models/cell/Cell';
import Color from '../models/enums/Color';

class MoveValidator {
	/**
	 * Checks if the given row and column are within the bounds of the board.
	 *
	 * @param board - The game board instance.
	 * @param row - The row position to check.
	 * @param col - The column position to check.
	 * @returns True if the row and column are within bounds, otherwise false.
	 */
	static isWithinBounds(board: Board, row: number, col: number): boolean {
		const rows = board.getCells().length;
		const cols = rows > 0 ? board.getCells()[0].length : 0;
		return row >= 0 && row < rows && col >= 0 && col < cols;
	}

	/**
	 * Determines if a move is allowed for a given cell and figure's color.
	 *
	 * @param cell - The target cell to check.
	 * @param color - The color of the figure attempting to move.
	 * @returns True if the move is allowed, otherwise false.
	 */
	static isMoveAllowed(cell: Cell | null, color: Color): boolean {
		return cell != null && (cell.noFigure() || cell.hasOpponentFigure(color));
	}
}

export default MoveValidator;
