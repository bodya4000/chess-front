import { FC } from 'react';
import { Oval } from 'react-loader-spinner';
import styles from '../../sceens/Home.module.scss';

const WaitingBlock: FC = () => {
	return (
		<div className={styles.user_welcome}>
			<h1>Підбираємо для вас опонента !</h1>

			<Oval visible={true} height='80' width='80' color='black' secondaryColor='antiquewhite' wrapperStyle={{}} wrapperClass='' />
		</div>
	);
};

export default WaitingBlock;
