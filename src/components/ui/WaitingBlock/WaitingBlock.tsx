import { FC } from 'react';
import { Oval } from 'react-loader-spinner';
import styles from '../../sceens/Home.module.scss';
import usePlayerConnection from '../../../features/chess/hooks/usePlayerConnection'

const WaitingBlock: FC = () => {
	usePlayerConnection();
	return (
		<div className={styles.user_welcome}>
			<h2>Підбираємо для вас опонента !</h2>
			<Oval visible={true} height='80' width='80' color='black' secondaryColor='antiquewhite' wrapperStyle={{}} wrapperClass='' />
		</div>
	);
};

export default WaitingBlock;
