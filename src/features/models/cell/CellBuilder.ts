import Color from '../enums/Color';
import Figure from '../figures/Figure';
import Board from '../models/Board';
import Cell from './Cell';

class CellBuilder {
	private row: number | null = null;
	private col: number | null = null;
	private colorCell: Color | null = null;
	private figureCell: Figure | null = null;
	private boardCell: Board | null = null;

	rowPos(row: number): this {
		this.row = row;
		return this;
	}

	colPos(col: number): this {
		this.col = col;
		return this;
	}

	color(colorCell: Color): this {
		this.colorCell = colorCell;
		return this;
	}

	figure(figureCell: Figure | null): this {
		this.figureCell = figureCell;
		return this;
	}

	board(boardCell: Board): this {
		this.boardCell = boardCell;
		return this;
	}

	build(): Cell {
		if (this.row !== null && this.col !== null && this.colorCell !== null && this.boardCell !== null) {
			return new Cell(this.row, this.col, this.colorCell, this.figureCell, this.boardCell);
		}
		throw new Error('All required fields (row, col, color, board) must be set before building the cell.');
	}
}

export default CellBuilder;
