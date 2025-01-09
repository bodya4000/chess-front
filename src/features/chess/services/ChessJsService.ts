import { Chess } from 'chess.js';
import CoordinationMapper from '../utils/CoordinationPositionMapper';
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

	private handleBestMove(message: string) {
		const [_, bestMove] = message.split(' ');
		console.log('BEST MOVE!!!:: ', bestMove);
		if (!bestMove) return;
		const startSquare = bestMove.slice(0, 2);
		const endSquare = bestMove.slice(2, 4);

		const startPos = CoordinationMapper.mapStringCoordinatesToMatrix(startSquare);
		const endPos = CoordinationMapper.mapStringCoordinatesToMatrix(endSquare);
		
		const board = this.boardService.getBoard();
		const figureCell = board.getCell(startPos.row, startPos.col);
		const moveCell = board.getCell(endPos.row, endPos.col);
		return { figureCell: { row: figureCell.getRowPos(), col: figureCell.getColPos() }, moveCell: { row: moveCell.getRowPos(), col: moveCell.getColPos() } };
	}

	/**
	 * Executes the user's move and updates the chess game state.
	 * @param start - Starting position of the move (row and column).
	 * @param end - Ending position of the move (row and column).
	 */
	userMakesMove(start: { row: number; col: number }, end: { row: number; col: number }): void {
		const startMove = CoordinationMapper.matrixToStringCoordinates(start);
		const endMove = CoordinationMapper.matrixToStringCoordinates(end);

		if (startMove && endMove) {
			const move = `${startMove}${endMove}`;
			console.log('move: ', move);
			this.chessGame.move(move);
		}
	}

	/**
	 * Executes the bot's move by analyzing the current position and invoking Stockfish.
	 */
	async botMakesMove() {
		const fen = this.chessGame.fen();
		const message = await this.engine.getBotMove(fen, this.depth);
		const data = message.data;
		const bestmove = data.bestmove;
		return this.handleBestMove(bestmove);
	}
}

export default ChessJsService;
