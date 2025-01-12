import Cell from '../models/cell/Cell';
import Color from '../models/enums/Color';
import Figures from '../models/enums/Figures';
import Figure from '../models/figures/Figure';
import King from '../models/figures/King';
import Pawn from '../models/figures/Pawn';
import BoardFinder from '../utils/BoardFinder';
import ChessHelper from '../utils/ChessHelper';

class MoveAnalyzer {
	private readonly BOARD_START_ROW = 0;
	private readonly BOARD_END_ROW = 7;

	/**
	 * Checks if a move is an en passant capture.
	 * @param figure The pawn attempting the move.
	 * @param targetCell The target cell of the move.
	 * @returns True if the move is an en passant capture, false otherwise.
	 */
	isEnPassantMove(figure: Figure, targetCell: Cell): boolean {
		if (figure.getFigureName() !== Figures.Pawn) return false;
		const pawn = figure as Pawn;
		const direction = pawn.getColor() === Color.WHITE ? -1 : 1;
		const capturedPawnCell = targetCell.getBoard().getCell(targetCell.getRowPos() + direction, targetCell.getColPos());

		const capturedFigure = capturedPawnCell?.getFigure();
		if (!capturedFigure || capturedFigure.getFigureName() !== Figures.Pawn || capturedFigure.getColor() === pawn.getColor()) {
			return false;
		}

		if (!targetCell.noFigure() || Math.abs(targetCell.getColPos() - pawn.getCell().getColPos()) !== 1) {
			return false;
		}

		const board = targetCell.getBoard();
		const lastMove = board.getLastMove();
		if (!lastMove || lastMove.figure !== capturedFigure || Math.abs(lastMove.from.getRowPos() - lastMove.to.getRowPos()) !== 2) {
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
	wasEnPassantMove(pawnThatDidMove: Figure, pawnCellAfterMove: Cell, pawnCellBeforeMove: Cell, enPassant: Figure): boolean {
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

	isCastlingMove(figure: Figure, targetCell: Cell) {
		if (figure.getFigureName() !== Figures.King) return false;
		const king = figure as King;
		const lockingCells = ChessHelper.getCastlingRookTargetCells(king);
		return lockingCells.some(cell => cell && cell.getRowPos() === targetCell.getRowPos() && cell.getColPos() === targetCell.getColPos());
	}

	wasCastlingMove(figure: Figure, previousCell: Cell): boolean {
		if (figure.getFigureName() !== Figures.King) return false;
		const king = figure as King;
		const board = king.getCell().getBoard();
		const currentCell = king.getCell();
		const defaultKingCell = BoardFinder.getDefaultKingCell(board, king.getColor());
		const movedTwoColumns = Math.abs(currentCell.getColPos() - previousCell.getColPos()) === 2;
		return previousCell === defaultKingCell && movedTwoColumns;
	}
}

export default MoveAnalyzer;
