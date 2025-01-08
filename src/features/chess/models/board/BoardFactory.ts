import { BoardView } from '../../types/BoardView'
import ModelsSerializer from '../../utils/ModelsSerializer'
import Cell from '../cell/Cell';
import Color from '../enums/Color';
import Bishop from '../figures/Bishop';
import Figure from '../figures/Figure';
import King from '../figures/King';
import Knight from '../figures/Knight';
import Pawn from '../figures/Pawn';
import Queen from '../figures/Queen';
import Rook from '../figures/Rook';
import Board from './Board';

class BoardFactory {
	private static readonly BOARD_SIZE = 8;
	private static readonly WHITE_HARD_FIGURES_ROW = 0;
	private static readonly WHITE_PAWNS_ROW = 1;
	private static readonly BLACK_PAWNS_ROW = 6;
	private static readonly BLACK_HARD_FIGURES_ROW = 7;

	private static readonly STARTING_FIGURE_PROVIDER = (cell: Cell, color: Color): Figure => {
		const colPos = cell.getColPos();
		switch (colPos) {
			case 0:
			case 7:
				return new Rook(cell, color);
			case 1:
			case 6:
				return new Knight(cell, color);
			case 2:
			case 5:
				return new Bishop(cell, color);
			case 4:
				return new Queen(cell, color);
			case 3:
				return new King(cell, color);
			default:
				console.error(`Invalid column position: ${colPos}`);
				throw new Error(`Invalid column position: ${colPos}`);
		}
	};

	public static initializeBoard(): Board {
		const board = new Board();
		const cells = this.createEmptyBoard(board);
		board.setCells(cells);
		this.fillBoardWithFigures(board);
		return board;
	}

	public static initializeBoardView(): BoardView {
		return ModelsSerializer.serializeBoard(this.initializeBoard())
	}

	private static createEmptyBoard(board: Board): Cell[][] {
		const cells: Cell[][] = [];
		for (let row = 0; row < this.BOARD_SIZE; row++) {
			const newRow: Cell[] = [];
			for (let col = 0; col < this.BOARD_SIZE; col++) {
				const color: Color = (row + col) % 2 === 0 ? Color.WHITE : Color.BLACK;
				newRow.push(Cell.builder().rowPos(row).colPos(col).color(color).board(board).build());
			}
			cells.push(newRow);
		}
		return cells;
	}

	private static fillBoardWithFigures(board: Board): void {
		const cells = board.getCells();
		this.fillRowWithFigures(cells[this.WHITE_HARD_FIGURES_ROW], Color.WHITE);
		this.fillRowWithPawns(cells[this.WHITE_PAWNS_ROW], cell => new Pawn(cell, Color.WHITE));
		this.fillRowWithPawns(cells[this.BLACK_PAWNS_ROW], cell => new Pawn(cell, Color.BLACK));
		this.fillRowWithFigures(cells[this.BLACK_HARD_FIGURES_ROW], Color.BLACK);
	}

	private static fillRowWithFigures(row: Cell[], color: Color): void {
		row.forEach(cell => {
			const figure = this.STARTING_FIGURE_PROVIDER(cell, color);
			cell.setFigure(figure);
		});
	}

	private static fillRowWithPawns(row: Cell[], figureProvider: (cell: Cell) => Figure): void {
		row.forEach(cell => {
			const figure = figureProvider(cell);
			cell.setFigure(figure);
		});
	}
}

export default BoardFactory;
