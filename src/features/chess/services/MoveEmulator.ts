import Cell from '../models/cell/Cell';
import Color from '../models/enums/Color';
import Figure from '../models/figures/Figure';
import ChessHelper from '../utils/ChessHelper';
import MoveAnalyzer from './MoveAnalyzer';

class MoveEmulator {
	private moveAnalyzer: MoveAnalyzer;

	constructor(moveAnalyzer: MoveAnalyzer) {
		this.moveAnalyzer = moveAnalyzer;
	}
	/**
	 * Simulates moving a figure to a new cell on the board.
	 */
	public emulateMove(figure: Figure, to: Cell): void {
		const from = figure.getCell();
		if (this.moveAnalyzer.isEnPassantMove(figure, to)) {			
			this.handleEnPassantCapture(figure, to);
		} else if (this.moveAnalyzer.isCastlingMove(figure, to)) {
			this.handleCastlingMove(figure, to);
		}
		this.moveFigureToTargetCell(figure, from, to);
	}

	private handleEnPassantCapture(figure: Figure, to: Cell) {
		const capturedCell = ChessHelper.getEnPassantCapturedCell(figure, to);
		if (capturedCell) {
			capturedCell.setFigure(null);
			console.log('en passant capture!');
		}
	}
	private handleCastlingMove(king: Figure, to: Cell) {
		const lockingCells = ChessHelper.getCastlingRookTargetCells(king);
		if (lockingCells.includes(to)) {
			const newCellForRook = ChessHelper.getCellForCastlingRook(king, to);
			const rook = ChessHelper.getRookOriginalCell(king, to).getFigure();
			to.setFigure(king);
			king.setCell(to);
			if (rook) {
				const rookCell = rook.getCell();
				rookCell.setFigure(null);
				newCellForRook.setFigure(rook);
				rook.setCell(newCellForRook);
			}
		}
	}
	private moveFigureToTargetCell(figure: Figure, from: Cell, to: Cell) {
		from.setFigure(null);
		to.setFigure(figure);
		figure.setCell(to);
	}

	/**
	 * Reverts a previously simulated move, including automatic detection of en passant and locking moves.
	 */
	public revertMove(figureThatMadeMove: Figure, currentFigureCell: Cell, previousFigureCell: Cell, capturedFigure: Figure | null): void {
		if (capturedFigure && this.moveAnalyzer.wasEnPassantMove(figureThatMadeMove, currentFigureCell, previousFigureCell, capturedFigure)) {
			this.handleEnPassantCaptureRevert(figureThatMadeMove, currentFigureCell, previousFigureCell);
		} else if (this.moveAnalyzer.wasCastlingMove(figureThatMadeMove, previousFigureCell)) {
			this.handleCastlingRevert(figureThatMadeMove, currentFigureCell, previousFigureCell);
		} else {
			this.handleDefaultMoveRevert(figureThatMadeMove, currentFigureCell, previousFigureCell, capturedFigure);
		}
	}

	private handleEnPassantCaptureRevert(figureThatMadeMove: Figure, currentFigureCell: Cell, previousFigureCell: Cell) {
		const board = figureThatMadeMove.getCell().getBoard();
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
	}
	private handleCastlingRevert(king: Figure, currentKingCell: Cell, previousKingCell: Cell) {
		console.log('castling revert');
		const rook = ChessHelper.getCastlingAssociatedRook(king);
		if (rook) {
			const rookCurrentCell = rook.getCell();
			const rookOriginalCell = ChessHelper.getRookOriginalCell(king, currentKingCell);
			rookCurrentCell.setFigure(null);
			rookOriginalCell.setFigure(rook);
			rook.setCell(rookOriginalCell);
			previousKingCell.setFigure(king);
			king.setCell(previousKingCell);
			currentKingCell.setFigure(null);
		}
	}
	private handleDefaultMoveRevert(figureThatMadeMove: Figure, currentFigureCell: Cell, previousFigureCell: Cell, capturedFigure: Figure | null) {
		previousFigureCell.setFigure(figureThatMadeMove);
		figureThatMadeMove.setCell(previousFigureCell);
		currentFigureCell.setFigure(capturedFigure);
		if (capturedFigure) capturedFigure.setCell(currentFigureCell);
	}
}

export default MoveEmulator;
