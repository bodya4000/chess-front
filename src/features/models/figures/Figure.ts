import Cell from '../cell/Cell';
import Color from '../enums/Color';
import Figures from '../enums/Figures';

abstract class Figure {
	private cell: Cell;
	private figureName: Figures = Figures.Figure;
	private color: Color;

	protected constructor(cell: Cell, color: Color, figureName: Figures) {
		this.cell = cell;
		this.color = color;
		this.figureName = figureName;
	}

	getCell() {
		return this.cell;
	}

	setCell(cell: Cell) {
		this.cell = cell;
	}

	getColor(): Color {
		return this.color;
	}

	getOpponentColor(): Color {
		return this.color === Color.WHITE ? Color.BLACK : Color.WHITE;
	}

	getFigureName(): Figures {
		return this.figureName;
	}

	abstract getFigureMoves(): Cell[];
}

export default Figure;
