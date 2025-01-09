import Board from '../../models/board/Board';
import Cell from '../../models/cell/Cell';
import Figures from '../../models/enums/Figures';
import Figure from '../../models/figures/Figure';
import King from '../../models/figures/King';
import Pawn from '../../models/figures/Pawn';
import MoveInfo from '../../models/value-objects/MoveInfo';
import { boardService, checkmateAnalyzer } from '../../services/services';

class ChessLogic {
	static handleFigureMove(board: Board, figure: Figure, from: Cell, to: Cell, possibleOpponentFigure: Figure | null) {
		boardService.emulateMove(figure, to);
		board.setLastMove(new MoveInfo(figure, possibleOpponentFigure, from, to));

		switch (figure.getFigureName()) {
			case Figures.Pawn:
				this.handlePawnMove(board, figure as Pawn);
				break;
			case Figures.King:
				this.handleKingMove(board, figure as King);
				break;
			default:
				this.handleRegularMove(board);
		}
	}

	static handlePawnMove(board: Board, figure: Pawn) {
		if (!figure.didAnyMove()) {
			figure.justDidFirstMove();
			board.setPawnThatJustDidTwoCellMove(figure);
		}
	}

	static handleKingMove(board: Board, figure: King) {
		if (!figure.didAnyMove()) figure.justDidFirstMove();
		board.setPawnThatJustDidTwoCellMove(null);
	}

	static handleRegularMove(board: Board) {
		board.setPawnThatJustDidTwoCellMove(null);
	}

	static checkForCheckmate<T extends { isCheck: boolean; isMate: boolean }>(board: Board, figure: Figure, newState: T) {
		if (checkmateAnalyzer.isCheck(board, figure.getOpponentColor())) {
			newState.isCheck = true;
			newState.isMate = checkmateAnalyzer.isMate(board, figure.getOpponentColor());
		}
	}
}

export default ChessLogic;
