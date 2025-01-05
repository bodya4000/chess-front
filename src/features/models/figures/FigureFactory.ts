import Cell from '../cell/Cell';
import Color from '../enums/Color';
import Figures from '../enums/Figures';
import Bishop from './Bishop';
import King from './King';
import Knight from './Knight';
import Pawn from './Pawn';
import Queen from './Queen';
import Rook from './Rook';

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
