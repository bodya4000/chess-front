import Board from '../models/Board';
import Cell from '../models/Cell';
import Color from '../models/Color';
import Figure from '../models/figures/Figure';
import Figures from '../models/figures/Figures';
import King from '../models/figures/King';
import Pawn from '../models/figures/Pawn';
import GameHelper from './GameHelper';

/**
 * Checks if the given row and column are within the bounds of the board.
 *
 * @param board - The game board instance.
 * @param row - The row position to check.
 * @param col - The column position to check.
 * @returns True if the row and column are within bounds, otherwise false.
 */
export function isWithinBounds(board: Board, row: number, col: number): boolean {
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
export function isMoveAllowed(cell: Cell | null, color: Color): boolean {
	return cell != null && (cell.noFigure() || cell.hasOpponentFigure(color));
}

/**
 * Checks if a move is an en passant capture.
 * @param figure The pawn attempting the move.
 * @param targetCell The target cell of the move.
 * @returns True if the move is an en passant capture, false otherwise.
 */
export function isEnPassantMove(figure: Figure, targetCell: Cell): boolean {
	if (figure.getFigureName() !== Figures.Pawn) return false;
	const pawn = figure as Pawn;
	const direction = pawn.getColor() === Color.WHITE ? -1 : 1;
	const capturedPawnCell = targetCell.getBoard().getCell(
			targetCell.getRowPos() + direction,
			targetCell.getColPos()
	);

	const capturedFigure = capturedPawnCell?.getFigure();
	if (
			!capturedFigure ||
			capturedFigure.getFigureName() !== Figures.Pawn ||
			capturedFigure.getColor() === pawn.getColor()
	) {
			return false;
	}

	if (!targetCell.noFigure() || Math.abs(targetCell.getColPos() - pawn.getCell().getColPos()) !== 1) {
			return false;
	}

	const board = targetCell.getBoard();
	const lastMove = board.getLastMove();
	if (
			!lastMove ||
			lastMove.movedFigure !== capturedFigure ||
			Math.abs(lastMove.startCell.getRowPos() - lastMove.endCell.getRowPos()) !== 2
	) {
			return false;
	}

	return true;
}


/**
 * Checks if the last move was en passant
 * @param pawnThatDidMove Pawn that captured en passant
 * @param pawnCellAfterMove Cell where the pawn is after the move emulation
 * @param pawnCellBeforeMove Cell where the pawn was before the move emulation
 * @param enPassant Pawn that was captured during the en passant
 * @returns True if the move was en passant, false otherwise
 */
export function wasEnPassantMove(pawnThatDidMove: Figure, pawnCellAfterMove: Cell, pawnCellBeforeMove: Cell, enPassant: Figure): boolean {
	const board = pawnCellAfterMove.getBoard();
	const direction = pawnThatDidMove.getColor() === Color.WHITE ? 1 : -1;	
	if (pawnThatDidMove.getFigureName() !== Figures.Pawn || enPassant.getFigureName() !== Figures.Pawn) return false;
	
	// Validate that the pawn moved diagonally
	const rowDifference = pawnCellAfterMove.getRowPos() - pawnCellBeforeMove.getRowPos();
	const colDifference = Math.abs(pawnCellAfterMove.getColPos() - pawnCellBeforeMove.getColPos());
	if (rowDifference !== direction || colDifference !== 1) return false;
	// Check that the en passant pawn is located on the same row as the target move
	const enPassantCell = enPassant.getCell();
	if (enPassantCell.getRowPos() !== pawnCellBeforeMove.getRowPos() || enPassantCell.getColPos() !== pawnCellAfterMove.getColPos()) return false;
	// Validate that the en passant pawn is removed and the board state matches
	const isEnPassantValid = board.getCell(enPassantCell.getRowPos(), enPassantCell.getColPos()).getFigure() === null;
	return isEnPassantValid;
}

/**
 * Returns the cell containing the pawn captured via en passant.
 */
export function getEnPassantCapturedCell(figure: Figure, targetCell: Cell): Cell | null {
	const direction = figure.getColor() === Color.WHITE ? -1 : 1;
	const board = targetCell.getBoard();
	return board.getCell(targetCell.getRowPos() + direction, targetCell.getColPos());
}

function getEnPassantTargetCells(figureCell: Cell, direction: number): Cell[] {
	const board = figureCell.getBoard();
	return [board.getCell(figureCell.getRowPos() - direction, figureCell.getColPos() + 1), board.getCell(figureCell.getRowPos() - direction, figureCell.getColPos() - 1)].filter(cell => cell != null);
}

export function isLockingMove(figure: Figure, targetCell: Cell) {
	if (figure.getFigureName() !== Figures.King) return false;
	const king = figure as King;
	const lockingCells = getLockingCells(king);
	return lockingCells.some(cell => cell && cell.getRowPos() === targetCell.getRowPos() && cell.getColPos() === targetCell.getColPos());
}

export function wasLockingMove(figure: Figure, previousCell: Cell): boolean {
	if (figure.getFigureName() !== Figures.King) return false;
	const king = figure as King;
	const board = king.getCell().getBoard();
	const currentCell = king.getCell();
	const defaultKingCell = GameHelper.getDefaultKingCell(board, king.getColor());
	const movedTwoColumns = Math.abs(currentCell.getColPos() - previousCell.getColPos()) === 2;
	console.debug(movedTwoColumns);
	
	return previousCell === defaultKingCell && movedTwoColumns;
}

export function getLockingCells(figure: Figure): Cell[] {
	const figureCell = figure.getCell();
	const board = figureCell.getBoard();
	const step = 2;
	return [board.getCell(figureCell.getRowPos(), figureCell.getColPos() + step), board.getCell(figureCell.getRowPos(), figureCell.getColPos() - step)];
}

export function getLockingCellForRook(king: Figure, targetCell: Cell): Cell {
	const board = targetCell.getBoard();
	if (targetCell.getColPos() < king.getCell().getColPos()) {
		return board.getCell(targetCell.getRowPos(), targetCell.getColPos() + 1);
	}
	return board.getCell(targetCell.getRowPos(), targetCell.getColPos() - 1);
}

export function getRookAfterLockingCell(king: Figure): Cell {
	const board = king.getCell().getBoard();
	const defaultKingCell = GameHelper.getDefaultKingCell(board, king.getColor());
	if (defaultKingCell.getColPos() < king.getCell().getColPos()) {
		return board.getCell(defaultKingCell.getRowPos(), 7);
	}
	return board.getCell(defaultKingCell.getRowPos(), 0);
}

export function getRookBeforeLockingCell(king: Figure, targetCell: Cell): Cell {
	const board = king.getCell().getBoard();
	if (targetCell.getColPos() < king.getCell().getColPos()) {
		return board.getCell(targetCell.getRowPos(), 0);
	}
	return board.getCell(targetCell.getRowPos(), 7);
}

export function getRook(king: Figure): Figure | null {
	const currentKingCell = king.getCell();
	const board = currentKingCell.getBoard();
	const defaultKingCell = GameHelper.getDefaultKingCell(board, king.getColor());
	if (defaultKingCell.getColPos() < currentKingCell.getColPos()) {
		return board.getCell(currentKingCell.getRowPos(), currentKingCell.getColPos() - 1).getFigure();
	}
	return board.getCell(currentKingCell.getRowPos(), currentKingCell.getColPos() + 1).getFigure();
}
