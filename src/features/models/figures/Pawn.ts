import MoveValidator from '../../utils/MoveValidator'
import Board from '../board/Board'
import Cell from '../cell/Cell';
import Color from '../enums/Color';
import Figures from '../enums/Figures';
import Figure from './Figure';

class Pawn extends Figure {
	private isFirstMove: boolean = true;
	private readonly direction: number;

	constructor(cell: Cell, color: Color) {
		super(cell, color, Figures.Pawn);
		this.direction = color === Color.WHITE ? 1 : -1;
	}

	public justDidFirstMove() {
		this.isFirstMove = false;
	}

	public didAnyMove() {
		return !this.isFirstMove;
	}

	getFigureMoves(): Cell[] {
		const cell = this.getCell();
		const board = cell.getBoard();
		const figureMoves: Cell[] = [];
		this.oneCellMove(figureMoves, board, cell.getRowPos(), cell.getColPos());
		this.twoCellMove(figureMoves, board, cell.getRowPos(), cell.getColPos());
		this.captureMove(figureMoves, board, cell.getRowPos(), cell.getColPos(), 'LEFT');
		this.captureMove(figureMoves, board, cell.getRowPos(), cell.getColPos(), 'RIGHT');
		this.checkEnPassant(figureMoves, board, cell.getRowPos(), cell.getColPos(), -1);
		this.checkEnPassant(figureMoves, board, cell.getRowPos(), cell.getColPos(), 1);
		return figureMoves;
	}

	private oneCellMove(figureMoves: Cell[], board: Board, rowPos: number, colPos: number) {
		if (!MoveValidator.isWithinBounds(board, rowPos + this.direction, colPos)) return;
		const targetCell = board.getCell(rowPos + this.direction, colPos);
		const valid = targetCell.noFigure();
		if (valid) figureMoves.push(targetCell);
	}

	private twoCellMove(figureMoves: Cell[], board: Board, rowPos: number, colPos: number) {
		if (!MoveValidator.isWithinBounds(board, rowPos + this.direction * 2, colPos)) return;
		const targetCell = board.getCell(rowPos + this.direction * 2, colPos);
		const valid = targetCell.noFigure() && this.isFirstMove && figureMoves.length > 0;
		if (valid) figureMoves.push(targetCell);
	}

	private captureMove(figureMoves: Cell[], board: Board, rowPos: number, colPos: number, side: 'LEFT' | 'RIGHT') {
		const horizontalPos = side === 'LEFT' ? colPos - 1 : colPos + 1;
		if (!MoveValidator.isWithinBounds(board, rowPos + this.direction, horizontalPos)) return;
		const targetCell = board.getCell(rowPos + this.direction, horizontalPos);
		const targetValid = this.cellHasOpponentFigure(targetCell);
		if (targetValid) figureMoves.push(targetCell);
	}

	private checkEnPassant(figureMoves: Cell[], board: Board, rowPos: number, colPos: number, direction: number) {
		if (!MoveValidator.isWithinBounds(board, rowPos + this.direction, colPos + direction)) return;
		const opponentCell = board.getCell(rowPos, colPos + direction);
		const targetCell = board.getCell(rowPos + this.direction, colPos + direction);
		const opponentFigure = opponentCell.getFigure();

		if (opponentFigure && opponentFigure.getColor() == this.getOpponentColor() && opponentFigure.getFigureName() === Figures.Pawn) {
			const opponentPawn = opponentFigure as Pawn;
			if (board.getPawnThatJustDidTwoCellMove() === opponentPawn) {
				figureMoves.push(targetCell);
			}
		}
	}

	private cellHasOpponentFigure(cell: Cell | null): boolean {
		return cell != null && cell.hasOpponentFigure(this.getColor());
	}
}

export default Pawn;
