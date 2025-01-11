import { Chess } from 'chess.js';
import { Coordinates } from '../types/Coordinates';
import CoordinationPositionMapper from '../utils/CoordinationPositionMapper';
import BoardService from './BoardService';
import StockfishService from './StockfishService';

/**
 * This class reflects the chess game using chess.js. This library is used to manage the game state
 * and provide the FEN string required by the Stockfish chess engine for game analysis.
 */
class ChessJsService {
	private readonly chessGame: Chess;
	private readonly engine;
	private readonly boardService: BoardService;
	private depth: number;

	constructor(boardService: BoardService, depth: number = 5) {
		this.chessGame = new Chess();
		this.engine = new StockfishService();
		this.boardService = boardService;
		this.depth = depth;
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

	private handleBestMove(message: string): Coordinates | void {
		const [_, bestMove] = message.split(' ');
		console.log('BEST MOVE!!!:: ', bestMove);
		if (!bestMove) return;
		return CoordinationPositionMapper.parseStringMoveToCells(bestMove);
	}

	/**
	 * Executes the user's move and updates the chess game state.
	 * @param start - Starting position of the move (row and column).
	 * @param end - Ending position of the move (row and column).
	 */
	userMakesMove(coordinates: Coordinates): void {
		const { figureCell, moveCell } = coordinates;
		const startMove = CoordinationPositionMapper.matrixToStringCoordinates(figureCell);
		const endMove = CoordinationPositionMapper.matrixToStringCoordinates(moveCell);

		if (startMove && endMove) {
			const move = `${startMove}${endMove}`;
			console.log('move: ', move);
			this.chessGame.move(move);
		}
	}

	/**
	 * Executes the bot's move by analyzing the current position and invoking Stockfish.
	 */
	async botMakesMove(): Promise<void | Coordinates> {
		const fen = this.chessGame.fen();
		const message = await this.engine.getBotMove(fen, this.depth);
		const data = message.data;
		const bestmove = data.bestmove;
		return this.handleBestMove(bestmove);
	}
}

export default ChessJsService;
