import Cell from '../../models/Cell'
import Color from '../../models/Color'
import Bishop from '../../models/figures/Bishop'
import Figures from '../../models/figures/Figures'
import King from '../../models/figures/King'
import Knight from '../../models/figures/Knight'
import Pawn from '../../models/figures/Pawn'
import Queen from '../../models/figures/Queen'
import Rook from '../../models/figures/Rook'


class FigureFactory {
  static createFigure(type: Figures, cell: Cell, color: Color) {
		
    switch (type) {
      case 'pawn':
        return new Pawn(cell, color);
      case 'rook':
        return new Rook(cell, color);
      case 'knight':
        return new Knight(cell, color);
      case 'bishop':
        return new Bishop(cell, color);
      case 'queen':
        return new Queen(cell, color);
      case 'king':
        return new King(cell, color);
      default:
        throw new Error(`Unknown figure type: ${type}`);
    }
  }
}

export default FigureFactory;
