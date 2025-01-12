import { Canvas } from '@react-three/fiber';
import { FC } from 'react';
import ChessFigure from '../../../../features/chess/components/ChessFigure/ChessFigure';
import ChessModes from '../../../../features/chess/enums/ChessModes';
import useApp from '../../../../features/chess/hooks/reduxSelelectors/useApp';
import useChessGame from '../../../../features/chess/hooks/reduxSelelectors/useChessGame';
import useOnlineChessBoard from '../../../../features/chess/hooks/reduxSelelectors/useOnlineChessBoard';
import { useAppDispatch } from '../../../../features/chess/hooks/useAppDispatch';
import Color from '../../../../features/chess/models/enums/Color';
import Figures from '../../../../features/chess/models/enums/Figures';
import { playerConnectionService } from '../../../../features/chess/services/services';
import { setFigureInsteadOfPawn } from '../../../../features/chess/state/ChessGameSlice';
import CoordinationPositionMapper from '../../../../features/chess/utils/CoordinationPositionMapper';
import FigureMapper from '../../../../features/chess/utils/FigureMapper';
import styles from '../FigureBoard.module.scss';

interface PromotingFigure {
	figureName: Figures;
	top: number | string;
	color: Color;
}

const PromotingFigure: FC<PromotingFigure> = ({ figureName, top, color }) => {
	const { pawnPromotionInfo } = useChessGame();
	const { opponentSession } = useOnlineChessBoard();
	const { mode } = useApp();
	const dispatch = useAppDispatch();
	const onClick = () => {
		dispatch(setFigureInsteadOfPawn(figureName));
		console.log(mode);
		console.log(pawnPromotionInfo);
		if (mode == ChessModes.ONLINE && pawnPromotionInfo) {
			const coordinates = pawnPromotionInfo?.fromCoordinates;
			const startMove = CoordinationPositionMapper.matrixToStringCoordinates(coordinates?.figureCell);
			const endMove = CoordinationPositionMapper.matrixToStringCoordinates(coordinates?.moveCell);
			const move = `${startMove[0]}x${endMove}=${FigureMapper.mapPromotionFigureToSymbol(figureName)}`;
			playerConnectionService.publish(`/app/player/move/${opponentSession}`, JSON.stringify({ move }));
		}
	};
	return (
		<div className={styles.board_item} onClick={onClick}>
			<Canvas style={{ position: 'absolute', top, left: 0, width: '100%', height: '25%' }}>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<ChessFigure scale={1.5} promoting color={color} figure={figureName} figureCell={null} id={-1} />
			</Canvas>
		</div>
	);
};

export default PromotingFigure;
