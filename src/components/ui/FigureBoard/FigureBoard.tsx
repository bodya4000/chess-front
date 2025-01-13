import { FC } from 'react';
import styles from './FigureBoard.module.scss';
import PromotingFigure from './PromotingFigure/PromotingFigure';

import Figures from '../../../features/chess/models/enums/Figures';
import { PawnPromotionInfo } from '../../../features/chess/types/PawnPromotionInfo';
import useSmoothAppearance from '../../hooks/useSmoothAppearance';

interface Props {
	pawnPromotionInfo: PawnPromotionInfo;
}

const FigureBoard: FC<Props> = ({ pawnPromotionInfo }) => {
	const { left } = useSmoothAppearance(!!pawnPromotionInfo);
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
};

export default FigureBoard;
