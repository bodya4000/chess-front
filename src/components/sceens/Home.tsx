import { FC } from 'react';
import BotBoard from '../../features/chess/components/ChessBoards/BotBoard';
import DemoBoard from '../../features/chess/components/ChessBoards/DemoBoard';
import OnlineBoard from '../../features/chess/components/ChessBoards/OnlineBoard';
import SingleBoard from '../../features/chess/components/ChessBoards/SingleBoard';
import ChessCanvas from '../../features/chess/components/ChessCanvas/ChessCanvas';
import ChessModes from '../../features/chess/enums/ChessModes';
import useApp from '../../features/chess/hooks/reduxSelelectors/useApp';
import useChessGame from '../../features/chess/hooks/reduxSelelectors/useChessGame';
import useOnlineChessBoard from '../../features/chess/hooks/reduxSelelectors/useOnlineChessBoard';
import { useAppDispatch } from '../../features/chess/hooks/useAppDispatch';
import { changeCameraControl } from '../../features/chess/state/AppSlice';
import FigureBoard from '../ui/FigureBoard/FigureBoard';
import WaitingBlock from '../ui/WaitingBlock/WaitingBlock';
import WelcomeBlock from '../ui/WelcomeBlock/WelcomeBlock';
import WhiteButton from '../ui/WhiteButton/WhiteButton';
import styles from './Home.module.scss';

const Home: FC = () => {
	const dispatch = useAppDispatch();
	const { mode, cameraControl } = useApp();
	const { pawnPromotionInfo } = useChessGame();
	const { waitingConnection } = useOnlineChessBoard();
	return (
		<>
			<header>
				{mode == ChessModes.DEMO && <WelcomeBlock />}
				{mode == ChessModes.ONLINE && waitingConnection && <WaitingBlock />}
			</header>
			<main>
				{pawnPromotionInfo && (
					<section aria-label='Board to pick promote figure'>
						<FigureBoard pawnPromotionInfo={pawnPromotionInfo} />
					</section>
				)}
				{/* 
				{mode == ChessModes.BOT && (
					<section aria-label='Board to pick chess bot level'>
						<ComplexityBoard />
					</section>
				)} */}
				{!pawnPromotionInfo && 	<section aria-label='Button to change board control mode'>
					<WhiteButton className={styles.left_top_btn} label={`${cameraControl ? 'Ручна камера' : 'Автоматична камера'}`} onClick={() => dispatch(changeCameraControl())} />
				</section>}
			

				<ChessCanvas>
					{mode === ChessModes.DEMO && <DemoBoard />}
					{mode === ChessModes.SINGLE && <SingleBoard />}
					{mode === ChessModes.BOT && <BotBoard />}
					{mode === ChessModes.ONLINE && <OnlineBoard />}
				</ChessCanvas>
			</main>
		</>
	);
};

export default Home;
