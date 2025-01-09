import BoardRepository from '../repositories/BoardRepository';
import BoardService from './BoardService';
import CheckmateAnalyzer from './CheckmateAnalyzer';
import ChessJsService from './ChessJsService';
import MoveAnalyzer from './MoveAnalyzer';
import MoveEmulator from './MoveEmulator';

const boardRepository = new BoardRepository();
const moveAnalyzer = new MoveAnalyzer();
const moveEmulator = new MoveEmulator(moveAnalyzer);
const boardService = new BoardService(boardRepository, moveEmulator);
const checkmateAnalyzer = new CheckmateAnalyzer(moveEmulator, moveAnalyzer);
const chessJsService = new ChessJsService(boardService);

export { boardRepository, boardService, checkmateAnalyzer, chessJsService, moveAnalyzer, moveEmulator };
