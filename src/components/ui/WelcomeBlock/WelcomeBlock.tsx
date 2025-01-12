import { FC } from 'react';
import { useDispatch } from 'react-redux';
import ChessModes from '../../../features/chess/enums/ChessModes';
import useApp from '../../../features/chess/hooks/reduxSelelectors/useApp';
import { setMode } from '../../../features/chess/state/AppSlice';
import styles from '../../sceens/Home.module.scss';

const WelcomeBlock: FC = () => {
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
	if (mode == ChessModes.DEMO)
		return (
			<div className={styles.user_welcome}>
				<h1>Виберіть як хочете грати</h1>

				<div className={styles.btn_container}>
					<button onClick={friendClick}>Друг</button>
					<button onClick={botClick}>Компʼютер</button>
					<button onClick={onlineClick}>Онлайн</button>
				</div>
			</div>
		);
};

export default WelcomeBlock;
