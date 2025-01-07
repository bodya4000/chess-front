import Board from '../models/board/Board';
import Cell from '../models/cell/Cell';
import { BoardView } from '../types/BoardView';
import { CellView } from '../types/CellView';

class ModelsSerializer {
	static serializeCell(cell: Cell): CellView {
		return {
			row: cell.getRowPos(),
			col: cell.getColPos(),
			color: cell.getColor(),
			figure: cell.hasFigure()
				? {
						id: cell.getFigure()?.getId() ?? -1,
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
}

export default ModelsSerializer;
