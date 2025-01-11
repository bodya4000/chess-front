import { FC } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import BotBoard from '../../features/chess/components/ChessBoards/BotBoard';
import DemoBoard from '../../features/chess/components/ChessBoards/DemoBoard';
import OnlineBoard from '../../features/chess/components/ChessBoards/OnlineBoard';
import SingleBoard from '../../features/chess/components/ChessBoards/SingleBoard';
import ChessCanvas from '../../features/chess/components/ChessCanvas/ChessCanvas';
import ChessModes from '../../features/chess/enums/ChessModes';
import useApp from '../../features/chess/hooks/reduxSelelectors/useApp';
import useOnlineChessBoard from '../../features/chess/hooks/reduxSelelectors/useOnlineChessBoard';
import { setMode } from '../../features/chess/state/AppSlice';
import styles from './Home.module.scss';

const Home: FC = () => {
	const { mode } = useApp();
	const { waitingConnection } = useOnlineChessBoard();
	console.log("waiting: ", waitingConnection);
	
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

			{mode === ChessModes.ONLINE && waitingConnection && (
				<div className={styles.user_welcome}>
					<h1>Підбираємо для вас опонента !</h1>

					<Oval visible={true} height='80' width='80' color='black' secondaryColor="antiquewhite" wrapperStyle={{}} wrapperClass='' />
				</div>
			)}

			{/* {mode === ChessModes.BOT && <ComplexityBoard />} */}

			<ChessCanvas>
				{mode === ChessModes.DEMO && <DemoBoard />}
				{mode === ChessModes.SINGLE && <SingleBoard />}
				{mode === ChessModes.BOT && <BotBoard />}
				{mode === ChessModes.ONLINE && <OnlineBoard />}
			</ChessCanvas>
		</>
	);
};

export default Home;
