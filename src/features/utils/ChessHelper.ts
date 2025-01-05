import Cell from '../models/cell/Cell';
import Color from '../models/enums/Color';
import Figure from '../models/figures/Figure';
import BoardFinder from './BoardFinder';

class ChessHelper {
    /**
     * Gets the cell containing the pawn captured during an en passant move.
     * @param pawn The pawn performing en passant.
     * @param targetCell The cell where the pawn moves.
     * @returns The cell containing the captured pawn, or null if invalid.
     */
    static getEnPassantCapturedCell(pawn: Figure, targetCell: Cell): Cell | null {
        const direction = pawn.getColor() === Color.WHITE ? -1 : 1;
        const board = targetCell.getBoard();
        return board.getCell(targetCell.getRowPos() + direction, targetCell.getColPos());
    }

    /**
     * Gets the cells where the rook should move during castling.
     * @param king The king performing castling.
     * @returns The cells the rook will occupy during castling.
     */
    static getCastlingRookTargetCells(king: Figure): Cell[] {
        const kingCell = king.getCell();
        const board = kingCell.getBoard();
        const step = 2; 
        return [
            board.getCell(kingCell.getRowPos(), kingCell.getColPos() + step),
            board.getCell(kingCell.getRowPos(), kingCell.getColPos() - step),
        ];
    }

    /**
     * Gets the cell where the rook will move after castling.
     * @param king The king performing castling.
     * @param targetCell The target cell of the king.
     * @returns The cell where the rook will move during castling.
     */
    static getRookFinalCellAfterCastling(king: Figure, targetCell: Cell): Cell {
        const board = targetCell.getBoard();
        if (targetCell.getColPos() < king.getCell().getColPos()) {
            return board.getCell(targetCell.getRowPos(), targetCell.getColPos() + 1);
        }
        return board.getCell(targetCell.getRowPos(), targetCell.getColPos() - 1);
    }

    /**
     * Gets the initial cell of the rook before castling.
     * @param king The king performing castling.
     * @returns The cell where the rook starts before castling.
     */
    static getRookStartingCellBeforeCastling(king: Figure): Cell {
        const board = king.getCell().getBoard();
        const defaultKingCell = BoardFinder.getDefaultKingCell(board, king.getColor());
        if (defaultKingCell.getColPos() < king.getCell().getColPos()) {
            return board.getCell(defaultKingCell.getRowPos(), 7);
        }
        return board.getCell(defaultKingCell.getRowPos(), 0);
    }

    /**
     * Gets the rook associated with the king for castling.
     * @param king The king performing castling.
     * @returns The rook figure associated with the king during castling, or null if not found.
     */
    static getCastlingAssociatedRook(king: Figure): Figure | null {
        const currentKingCell = king.getCell();
        const board = currentKingCell.getBoard();
        const defaultKingCell = BoardFinder.getDefaultKingCell(board, king.getColor());
        if (defaultKingCell.getColPos() < currentKingCell.getColPos()) {
            return board.getCell(currentKingCell.getRowPos(), currentKingCell.getColPos() - 1).getFigure();
        }
        return board.getCell(currentKingCell.getRowPos(), currentKingCell.getColPos() + 1).getFigure();
    }
}

export default ChessHelper;
