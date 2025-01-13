import { useCallback, useEffect } from 'react';
import ChessModes from '../enums/ChessModes';
import Color from '../models/enums/Color';
import { playerConnectionService } from '../services/services';
import { setMode } from '../state/AppSlice';
import { completeMove, setCurrentFigureCell, setNewPos } from '../state/ChessGameSlice';
import { establishConnection } from '../state/OnlineChessBoardSlice';
import { SocketEstablishMessage } from '../types/SocketEstablishMessage';
import { SocketMoveMessage } from '../types/SocketMoveMessage';
import CoordinationPositionMapper from '../utils/CoordinationPositionMapper';
import FigureMapper from '../utils/FigureMapper';
import { debounce } from '../utils/Functions';
import Generator from '../utils/Generator';
import useChessGame from './reduxSelelectors/useChessGame';
import { useAppDispatch } from './useAppDispatch';
import useResponsiveBoardValues from './useResponsiveBoardValues';

const usePlayerConnection = () => {
	const dispatch = useAppDispatch();
	const { board } = useChessGame();

	const handleEstablishMessage = useCallback(
		(data: SocketEstablishMessage, userSession: string) => {
			const userColor = data.playerColor === 'Black' ? Color.BLACK : Color.WHITE;
			dispatch(setMode(ChessModes.ONLINE));
			dispatch(
				establishConnection({
					userSession,
					opponentSession: data.sessionId,
					waitingConnection: false,
					userColor,
				})
			);
		},
		[dispatch]
	);

	const { cellSize } = useResponsiveBoardValues();

	const handleMoveMessage = useCallback(
		(data: SocketMoveMessage) => {
			if (board) {
				const coordinates = CoordinationPositionMapper.parseStringMoveToCells(data.move);
				const target3DPosition = CoordinationPositionMapper.get3DPositionMove(coordinates, cellSize);
				console.log(coordinates);
				const movingFigure = board.cells[coordinates.figureCell.row][coordinates.figureCell.col];
				dispatch(setCurrentFigureCell(movingFigure));
				dispatch(setNewPos(target3DPosition));
				debounce(() => {
					if (data.move.length === 6) {
						const promotionFigureName = FigureMapper.mapPromotionFigure(data.move[5]);
						dispatch(completeMove({ coordinates, promotionFigureName }));
					} else {
						dispatch(completeMove({ coordinates }));
					}
				}, 1000);
			}
		},
		[board, cellSize, dispatch]
	);

	useEffect(() => {
		playerConnectionService.connect(
			() => {
				const userSession = Generator.generateSessionId();
				const subscription = playerConnectionService.subscribe(`/topic/player/${userSession}`, message => {
					const data = JSON.parse(message.body);
					if (data.foundOpponent) handleEstablishMessage(data, userSession);
					if (data.move) handleMoveMessage(data);
				});

				playerConnectionService.publish(`/app/player/${userSession}`);

				return () => {
					subscription.unsubscribe();
					playerConnectionService.disconnect();
				};
			},
			error => {
				console.error('Broker reported error:', error);
			}
		);
	}, [dispatch, handleEstablishMessage, handleMoveMessage]);
};

export default usePlayerConnection;
