import Board from '../models/board/Board';
import Cell from '../models/cell/Cell';
import Color from '../models/enums/Color';
import Figures from '../models/enums/Figures';
import Figure from '../models/figures/Figure';
import BoardFinder from '../utils/BoardFinder';
import ChessHelper from '../utils/ChessHelper';
import MoveAnalyzer from './MoveAnalyzer';
import MoveEmulator from './MoveEmulator';

class CheckmateAnalyzer {
	private moveEmulator: MoveEmulator;
	private moveAnalyzer: MoveAnalyzer;

	constructor(moveEmulator: MoveEmulator, moveAnalyzer: MoveAnalyzer) {
		this.moveEmulator = moveEmulator;
		this.moveAnalyzer = moveAnalyzer;
	}

	/**
	 * Determines if the king of the specified color is in check.
	 * @param board The game board.
	 * @param kingColor The color of the king to check.
	 * @returns True if the king is in check, otherwise false.
	 */
	isCheck(board: Board, kingColor: Color): boolean {
		const cells = board.getCells();
		const kingCell = BoardFinder.getKingCell(board, kingColor);

		for (const row of cells) {
			for (const cell of row) {
				const opponent = cell.getFigure();
				if (opponent && opponent.getOpponentColor() === kingColor && opponent.getFigureMoves().includes(kingCell)) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Determines if the king of the specified color is in checkmate.
	 * @param board The game board.
	 * @param kingColor The color of the king to check.
	 * @returns True if the king is in checkmate, otherwise false.
	 */
	isMate(board: Board, kingColor: Color): boolean {
		const king = BoardFinder.getKing(board, kingColor);
		const kingMoves = this.getMovesWithoutCheck(board, king);

		if (kingMoves.length > 0) {
			return false;
		}
		const cells = board.getCells();
		for (const row of cells) {
			for (const cell of row) {
				const figure = cell.getFigure();
				if (figure && figure.getColor() === kingColor) {
					const moves = this.getMovesWithoutCheck(board, figure);
					if (moves.length > 0) {
						return false;
					}
				}
			}
		}

		return true;
	}

	/**
	 * Filters out moves that would leave the king in check, including special handling for castling.
	 * @param board The current game board.
	 * @param figure The figure for which to calculate safe moves.
	 * @returns A list of valid moves for the figure that do not leave the king in check.
	 */
	getMovesWithoutCheck(board: Board, figure: Figure): Cell[] {
		const figureMoves = figure.getFigureMoves();
		let castlingMoves: Cell[] = [];
		const filteredFigureMoves = figureMoves.filter(cellToMove => {
			const figureCellBeforeMove = figure.getCell();
			let capturedFigure: Figure | null;

			if (figure.getFigureName() === Figures.Pawn && this.moveAnalyzer.isEnPassantMove(figure, cellToMove)) {
				const capturedCell = ChessHelper.getEnPassantCapturedCell(figure, cellToMove);
				capturedFigure = capturedCell ? capturedCell?.getFigure() : null;
			} else {
				capturedFigure = cellToMove.getFigure();
			}

			this.moveEmulator.emulateMove(figure, cellToMove);
			const isCheck = this.isCheck(board, figure.getColor());
			this.moveEmulator.revertMove(figure, cellToMove, figureCellBeforeMove, capturedFigure);

			if (isCheck) return false;
			if (figure.getFigureName() === Figures.King && this.moveAnalyzer.isCastlingMove(figure, cellToMove)) {
				castlingMoves.push(cellToMove);
				return false;
			}
			return true;
		});
		console.log(filteredFigureMoves);
		castlingMoves = castlingMoves.filter(cellToMove => this.checkCastlingMovePossibility({ king: figure, cellToMove }, filteredFigureMoves));
		console.log(castlingMoves);
		return filteredFigureMoves.concat(castlingMoves);
	}

	/**
	 * Checks if a castling move is possible.
	 * @param king The king figure.
	 * @param cellToMove The target cell for the castling move.
	 * @param partlyFilteredCells The cells that are not under attack.
	 * @returns True if the castling move is possible, false otherwise.
	 */
	private checkCastlingMovePossibility({ king, cellToMove }: { king: Figure; cellToMove: Cell }, partlyFilteredCells: Cell[]): boolean {
		const kingCell = king.getCell();
		const board = kingCell.getBoard();
		const kingStartCol = kingCell.getColPos();
		const targetCol = cellToMove.getColPos();

		if (Math.abs(targetCol - kingStartCol) !== 2) {
			return false;
		}

		const isShortCastling = targetCol < kingStartCol;
		const isLongCastling = targetCol > kingStartCol;

		if (isShortCastling) {
			const requiredCells = [board.getCell(kingCell.getRowPos(), kingStartCol - 1)];
			console.log(requiredCells);
			console.log(partlyFilteredCells);
			console.log(requiredCells.every(cell => partlyFilteredCells.some(filteredCell => filteredCell.getRowPos() == cell.getRowPos() && filteredCell.getColPos() == cell.getColPos())));
			return requiredCells.every(cell => partlyFilteredCells.some(filteredCell => filteredCell.getRowPos() == cell.getRowPos() && filteredCell.getColPos() == cell.getColPos()));
		}

		if (isLongCastling) {
			console.log('checcking long castling!');
			const requiredCells = [board.getCell(kingCell.getRowPos(), kingStartCol + 1), board.getCell(kingCell.getRowPos(), kingStartCol + 2), board.getCell(kingCell.getRowPos(), kingStartCol + 3)];
			return requiredCells.every(cell => partlyFilteredCells.some(filteredCell => filteredCell.getRowPos() == cell.getRowPos() && filteredCell.getColPos() == cell.getColPos()));
		}
		return false;
	}
}

export default CheckmateAnalyzer;
