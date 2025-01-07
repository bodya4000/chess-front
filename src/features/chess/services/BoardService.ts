import Cell from '../models/cell/Cell';
import Figure from '../models/figures/Figure';
import BoardRepository from '../repositories/BoardRepository';
import ModelsSerializer from '../utils/ModelsSerializer';
import MoveEmulator from './MoveEmulator';

class BoardService {
	private boardRepository: BoardRepository;
	private moveEmulator: MoveEmulator;

	constructor(boardRepository: BoardRepository, moveEmulator: MoveEmulator) {
		this.boardRepository = boardRepository;
		this.moveEmulator = moveEmulator;
	}

	getBoard() {
		return this.boardRepository.getBoard();
	}

	getSerializedBoard() {
		return ModelsSerializer.serializeBoard(this.getBoard());
	}

	emulateMove(figure: Figure, targetCell: Cell) {
		this.moveEmulator.emulateMove(figure, targetCell);
	}

	revertMove(figure: Figure, currentCell: Cell, previousCell: Cell, capturedFigure: Figure | null) {
		this.moveEmulator.revertMove(figure, currentCell, previousCell, capturedFigure);
	}
}

export default BoardService;
