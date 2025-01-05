import Board from '../models/Board';
import Cell from '../models/Cell';
import Color from '../models/Color';
import Figures from '../models/figures/Figures';
import { BoardView } from '../types/BoardView';
import { CellView } from '../types/CellView';
import FigureFactory from './factories/FigureFactory';

class TypesHelper {
	static serializeCell(cell: Cell): CellView {
		return {
			row: cell.getRowPos(),
			col: cell.getColPos(),
			color: cell.getColor(),
			figure: cell.hasFigure()
				? {
						type: cell.getFigure()?.getFigureName()?.toString() ?? 'unknown',
						color: cell.getFigure()?.getColor()?.toString() ?? 'unknown',
				  }
				: null,
		};
	}

	static serializeBoard(board: Board): BoardView {
		return {
			cells: board.getCells().map(row => row.map(cell => this.serializeCell(cell))),
		};
	}

	static deserializeCell(cellView: CellView, board: Board): Cell {
		const cell = new Cell(cellView.row, cellView.col, cellView.color as Color, null, board);

		if (cellView.figure) {
			const figure = FigureFactory.createFigure(cellView.figure.type as Figures, cell, cellView.figure.color as Color);
			cell.setFigure(figure);
		}

		return cell;
	}

	static deserializeBoard(boardView: BoardView): Board {
		const board = new Board();
		const cells: Cell[][] = boardView.cells.map(row => row.map(cellView => this.deserializeCell(cellView, board)));

		board.setCells(cells);
		return board;
	}
}

export default TypesHelper;
