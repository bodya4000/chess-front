import Board from '../models/board/Board'
import BoardFactory from '../models/board/BoardFactory';
import TypesHelper from '../utils/ModelsSerializer';

class BoardRepository {
	private board: Board;

	constructor() {
		this.board = BoardFactory.initializeBoard();
	}

	getBoard() {
		return this.board;
	}

	getSerializedBoard() {
		return TypesHelper.serializeBoard(this.board);
	}
}

export default BoardRepository;
