import Board from '../models/Board'
import Cell from '../models/Cell'
import Figure from '../models/figures/Figure'
import BoardFactory from '../utils/factories/BoardFactory'
import GameHelper from '../utils/GameHelper'
import TypesHelper from '../utils/TypesHelper'

class BoardService {
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

  makeMove(figure:Figure, targetCell:Cell) {
    GameHelper.emulateMove(figure, targetCell);
  }

  revertMove(figure:Figure, currentCell:Cell, previousCell:Cell, capturedFigure:Figure | null) {
    GameHelper.revertMove(figure, currentCell, previousCell, capturedFigure);
  }
}

export default new BoardService;
