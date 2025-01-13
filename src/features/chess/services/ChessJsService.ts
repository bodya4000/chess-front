import { Chess } from 'chess.js';
import { Coordinates } from '../types/Coordinates';
import { OpponentMoveInfo } from '../types/OpponentMoveInfo';
import CoordinationPositionMapper from '../utils/CoordinationPositionMapper';
import FigureMapper from '../utils/FigureMapper';
import StockfishService from './StockfishService';

/**
 * This class reflects the chess game using chess.js. This library is used to manage the game state
 * and provide the FEN string required by the Stockfish chess engine for game analysis.
 */
class ChessJsService {
	private readonly chessGame: Chess;
	private readonly engine;
	private depth: number;

	constructor(depth: number = 5) {
		this.chessGame = new Chess();
		this.engine = new StockfishService();
		this.depth = depth;
	}

	getLastMove(): string | null {
		const history = this.chessGame.history();
		if (history.length > 0) {
			return history[history.length - 1];
		}
		return null;
	}

	setDepth(depth: number) {
		this.depth = depth;
	}
	getDepth() {
		return this.depth;
	}

	/**
	 * Starts a new chess game and displays the board in ASCII format (for debugging).
	 */
	startGame(): void {
		console.log(this.chessGame.ascii());
	}

	private handleBestMove(message: string): OpponentMoveInfo | void {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, bestMove] = message.split(' ');
		console.log('BEST MOVE!!!:: ', bestMove);
		if (!bestMove) return;
		if (bestMove.length == 5) {
			const promotionFigureName = FigureMapper.mapPromotionFigure(bestMove[4]);
			return { coordinates: CoordinationPositionMapper.parseStringMoveToCells(bestMove), promotionFigureName };
		}
		return { coordinates: CoordinationPositionMapper.parseStringMoveToCells(bestMove) };
	}

	/**
	 * Executes the user's move and updates the chess game state.
	 * @param start - Starting position of the move (row and column).
	 * @param end - Ending position of the move (row and column).
	 */
	userMakesMove(coordinates: Coordinates, promotionFigure?: string): void {
		const { figureCell, moveCell } = coordinates;

		const startMove = CoordinationPositionMapper.matrixToStringCoordinates(figureCell);
		const endMove = CoordinationPositionMapper.matrixToStringCoordinates(moveCell);

		if (startMove && endMove) {
			let move = `${startMove}${endMove}`;
			if (promotionFigure) {
				move = `${startMove[0]}x${endMove}=${promotionFigure.toUpperCase()[0]}`;
				console.log(this.chessGame.moves());
			}

			console.log('move: ', move);
			const result = this.chessGame.move(move);

			if (!result) {
				console.error('Invalid move: ', move);
			}
		}
	}

	/**
	 * Executes the bot's move by analyzing the current position and invoking Stockfish.
	 */
	async botMakesMove(): Promise<void | OpponentMoveInfo> {
		const fen = this.chessGame.fen();
		const message = await this.engine.getBotMove(fen, this.depth);
		console.log(message);
		const data = message;
		const bestmove = data.bestmove;
		return this.handleBestMove(bestmove);
	}
}

export default ChessJsService;
