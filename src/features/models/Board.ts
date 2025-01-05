import Cell from './Cell';
import Pawn from './figures/Pawn';
import MoveInfo from './MoveInfo';

class Board {
	private cells: Cell[][] = [];
	private pawnThatJustDidTwoCellMove: Pawn | null = null;
	private lastMove: MoveInfo | undefined;

	constructor() {}

	getLastMove() {
		return this.lastMove;
	}
	setLastMove(move: MoveInfo) {
		this.lastMove = move;
	}

	getCells(): Cell[][] {
		return this.cells;
	}

	setCells(cells: Cell[][]) {
		this.cells = cells;
	}

	getPawnThatJustDidTwoCellMove() {
		return this.pawnThatJustDidTwoCellMove;
	}

	setPawnThatJustDidTwoCellMove(pawn: Pawn | null) {
		this.pawnThatJustDidTwoCellMove = pawn;
	}

	getCell(rowPos: number, colPos: number): Cell {
		return this.cells[rowPos][colPos];
	}

	clone() {
		const newBoard = new Board();
		newBoard.setCells(this.cells);
		newBoard.setPawnThatJustDidTwoCellMove(this.pawnThatJustDidTwoCellMove);
		if (this.lastMove) newBoard.setLastMove(this.lastMove);
		return newBoard;
	}
}

export default Board;
