import Board from '../models/Board';
import Cell from '../models/Cell';
import Color from '../models/Color';
import Figure from '../models/figures/Figure';
import Figures from '../models/figures/Figures';
import { getEnPassantCapturedCell, getLockingCellForRook, getLockingCells, getRook, getRookAfterLockingCell, getRookBeforeLockingCell, isEnPassantMove, isLockingMove, wasEnPassantMove, wasLockingMove } from './MoveHelper';

class GameHelper {
	/**
	 * Retrieves the king figure of the specified color from the board.
	 * Throws an error if the king is not found.
	 */
	static getKing(board: Board, color: Color): Figure {
		for (const row of board.getCells()) {
			for (const cell of row) {
				const figure = cell.getFigure();
				if (figure && figure.getColor() === color && figure.getFigureName() === Figures.King) {
					return figure;
				}
			}
		}
		throw new Error(`King not found for the color: ${color}`);
	}

	static getDefaultKingCell(board: Board, color: Color) {
		if (color == Color.WHITE) {
			return board.getCell(0, 4);
		} else {
			return board.getCell(7, 3);
		}
	}

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
	 * Simulates moving a figure to a new cell on the board.
	 */
	static emulateMove(figure: Figure, to: Cell): void {
		const from = figure.getCell();

		if (isEnPassantMove(figure, to)) {
			const capturedCell = getEnPassantCapturedCell(figure, to);
			if (capturedCell) {
				capturedCell.setFigure(null);
				console.log('en passant capture!');
			}
		} else if (isLockingMove(figure, to)) {
			const lockingCells = getLockingCells(figure);
			if (lockingCells.includes(to)) {
				to.setFigure(figure);
				figure.setCell(to);
				const newCellForRook = getLockingCellForRook(figure, to);
				const rook = getRookBeforeLockingCell(figure, to).getFigure();
				if (rook) {
					const rookCell = rook.getCell();
					rookCell.setFigure(null);
					newCellForRook.setFigure(rook);
					rook.setCell(newCellForRook);
				}
			}
		}

		if (to.hasFigure()) {
			console.log('default capture!');
		}

		from.setFigure(null);
		to.setFigure(figure); // default move
		figure.setCell(to);
	}

	/**
	 * Reverts a previously simulated move, including automatic detection of en passant and locking moves.
	 */
	static revertMove(figureThatMadeMove: Figure, currentFigureCell: Cell, previousFigureCell: Cell, capturedFigure: Figure | null): void {
		const board = currentFigureCell.getBoard();
		if (capturedFigure && wasEnPassantMove(figureThatMadeMove, currentFigureCell, previousFigureCell, capturedFigure)) {
			console.log('was move en passant!');
			const direction = figureThatMadeMove.getColor() === Color.WHITE ? -1 : 1;
			const enPassantCapturedCell = board.getCell(currentFigureCell.getRowPos() + direction, currentFigureCell.getColPos());
			const enPassantCapturedFigure = board.getPawnThatJustDidTwoCellMove();

			if (enPassantCapturedCell && enPassantCapturedFigure) {
				enPassantCapturedCell.setFigure(enPassantCapturedFigure);
				enPassantCapturedFigure.setCell(enPassantCapturedCell);
				previousFigureCell.setFigure(figureThatMadeMove);
				figureThatMadeMove.setCell(previousFigureCell);
				currentFigureCell.setFigure(null);
			}
		} else if (wasLockingMove(figureThatMadeMove, previousFigureCell)) {
			console.log('was lock move!');
			const rook = getRook(figureThatMadeMove);
			if (rook) {
				const rookCurrentCell = rook.getCell();
				const rookOriginalCell = getRookAfterLockingCell(figureThatMadeMove);
				rookCurrentCell.setFigure(null);
				rookOriginalCell.setFigure(rook);
				rook.setCell(rookOriginalCell);

				previousFigureCell.setFigure(figureThatMadeMove);
				figureThatMadeMove.setCell(previousFigureCell);
				currentFigureCell.setFigure(null);
			}
		} else if (capturedFigure) {
			console.log('was capture!');
			previousFigureCell.setFigure(figureThatMadeMove);
			figureThatMadeMove.setCell(previousFigureCell);
			currentFigureCell.setFigure(capturedFigure);
			capturedFigure.setCell(currentFigureCell);
		} else {
			console.log('wasn`t capture!');
			previousFigureCell.setFigure(figureThatMadeMove);
			figureThatMadeMove.setCell(previousFigureCell);
			currentFigureCell.setFigure(null);
		}
	}
}

export default GameHelper;
