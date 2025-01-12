import { FC } from 'react';
import useChessGame from '../../../features/chess/hooks/reduxSelelectors/useChessGame';
import styles from './FigureBoard.module.scss';
import PromotingFigure from './PromotingFigure/PromotingFigure';

import Figures from '../../../features/chess/models/enums/Figures';
import useSmoothAppearance from '../../hooks/useSmoothAppearance';

const FigureBoard: FC = () => {
	const { pawnPromotionInfo } = useChessGame();
	const { left } = useSmoothAppearance(!!pawnPromotionInfo);

	if (pawnPromotionInfo) {
		return (
			<div style={{ left, transition: 'left 0.3s ease-in-out' }} className={styles.board}>
				<div className={styles.board_container}>
					<PromotingFigure top={'5%'} color={pawnPromotionInfo.color} figureName={Figures.Queen} />
					<PromotingFigure top={'30%'} color={pawnPromotionInfo.color} figureName={Figures.Rook} />
					<PromotingFigure top={'55%'} color={pawnPromotionInfo.color} figureName={Figures.Bishop} />
					<PromotingFigure top={'80%'} color={pawnPromotionInfo.color} figureName={Figures.Knight} />
				</div>
			</div>
		);
	}
};

export default FigureBoard;
