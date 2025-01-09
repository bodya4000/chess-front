import { FC } from 'react';
import { useDispatch } from 'react-redux';
import BotBoard from '../../features/chess/components/ChessBoards/BotBoard';
import DemoBoard from '../../features/chess/components/ChessBoards/DemoBoard';
import SingleBoard from '../../features/chess/components/ChessBoards/SingleBoard';
import ChessCanvas from '../../features/chess/components/ChessCanvas/ChessCanvas';
import ComplexityBoard from '../../features/chess/components/ComplexityBoard/ComplexityBoard';
import ChessModes from '../../features/chess/enums/ChessModes';
import useApp from '../../features/chess/hooks/reduxSelelectors/useApp';
import { setMode } from '../../features/chess/state/AppSlice';
import styles from './Home.module.scss';

const Home: FC = () => {
	const { mode } = useApp();
	const dispatch = useDispatch();
	const friendClick = () => {
		dispatch(setMode(ChessModes.SINGLE));
	};
	const botClick = () => {
		dispatch(setMode(ChessModes.BOT));
	};
	const onlineClick = () => {
		dispatch(setMode(ChessModes.ONLINE));
	};
	return (
		<>
			{mode === ChessModes.DEMO && (
				<div className={styles.user_welcome}>
					<h1>Виберіть як хочете грати</h1>

					<div className={styles.btn_container}>
						<button onClick={friendClick}>Друг</button>
						<button onClick={botClick}>Компʼютер</button>
						<button onClick={onlineClick}>Онлайн</button>
					</div>
				</div>
			)}

			{/* {mode === ChessModes.BOT && <ComplexityBoard />} */}

			<ChessCanvas>
				{mode === ChessModes.DEMO && <DemoBoard />}
				{mode === ChessModes.SINGLE && <SingleBoard />}
				{mode === ChessModes.BOT && <BotBoard />}
			</ChessCanvas>
		</>
	);
};

export default Home;
