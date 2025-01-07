import Board from '../models/board/Board'
import Cell from '../models/cell/Cell';
import Color from '../models/enums/Color';
import Figures from '../models/enums/Figures';
import Figure from '../models/figures/Figure';

class BoardFinder {
	/**
	 * Retrieves the cell containing the king of the specified color.
	 * Throws an error if the king is not found.
	 */
	static getKingCell(board: Board, color: Color): Cell {
		for (const row of board.getCells()) {
			for (const cell of row) {
				const figure = cell.getFigure();
				if (figure && figure.getColor() === color && figure.getFigureName() === Figures.King) {
					return cell;
				}
			}
		}
		throw new Error(`King's cell not found for the color: ${color}`);
	}

	/**
	 * Retrieves the king figure of the specified color from the board.
	 * Throws an error if the king is not found.
	 */
	static getKing(board: Board, color: Color): Figure {
		const king = BoardFinder.getKingCell(board, color).getFigure();
		if (king) {
			return king;
		}
		throw new Error(`King's cell not found for the color: ${color}`);
	}

	static getDefaultKingCell(board: Board, color: Color) {
		if (color == Color.WHITE) {
			return board.getCell(0, 3);
		} else {
			return board.getCell(7, 3);
		}
	}
}

export default BoardFinder;
