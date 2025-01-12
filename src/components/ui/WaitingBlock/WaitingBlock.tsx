import { FC } from 'react';
import { Oval } from 'react-loader-spinner';
import ChessModes from '../../../features/chess/enums/ChessModes';
import useApp from '../../../features/chess/hooks/reduxSelelectors/useApp';
import useOnlineChessBoard from '../../../features/chess/hooks/reduxSelelectors/useOnlineChessBoard';
import styles from '../../sceens/Home.module.scss';

const WaitingBlock: FC = () => {
	const { mode } = useApp();
	const { waitingConnection } = useOnlineChessBoard();
	if (mode === ChessModes.ONLINE && waitingConnection)
		return (
			<div className={styles.user_welcome}>
				<h1>Підбираємо для вас опонента !</h1>

				<Oval visible={true} height='80' width='80' color='black' secondaryColor='antiquewhite' wrapperStyle={{}} wrapperClass='' />
			</div>
		);
};

export default WaitingBlock;
