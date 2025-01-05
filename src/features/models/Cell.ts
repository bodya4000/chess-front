import CellBuilder from '../utils/factories/builders/CellBuilder'
import Board from './Board';
import Color from './Color';
import Figure from './figures/Figure';

class Cell {
	private readonly rowPos: number;
	private readonly colPos: number;
	private readonly color: Color;
	private figure: Figure | null = null;
	private board: Board;

	constructor(rowPos: number, colPos: number, color: Color, figure: Figure | null, board: Board) {
		this.rowPos = rowPos;
		this.colPos = colPos;
		this.color = color;
		this.figure = figure;
		this.board = board;
	}

	public setFigure(figure: Figure | null) {
		this.figure = figure;
	}

	public getBoard(): Board {
		return this.board;
	}

	getRowPos() {
		return this.rowPos;
	}

	getColPos() {
		return this.colPos;
	}

	getColor() {
		return this.color;
	}

	getFigure() {
		return this.figure;
	}

	hasFigure(): boolean {
		return this.figure !== null && this.figure !== undefined;
	}

	noFigure(): boolean {
		return this.figure === null || this.figure === undefined;
	}

	hasOpponentFigure(color: Color): boolean {
		if (!this.figure) return false;
		const enemyColor = color === Color.WHITE ? Color.BLACK : Color.WHITE;
		return this.figure.getColor() === enemyColor;
	}

	hasTeammateFigure(color: Color): boolean {
		if (!this.figure) return false;
		const teammateFigure = color === Color.WHITE ? Color.WHITE : Color.BLACK;
		return this.figure.getColor() === teammateFigure;
	}

	public static builder(): CellBuilder {
		return new CellBuilder();
	}
}

export default Cell;
