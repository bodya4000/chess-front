import { FC } from 'react';
import styles from './ComplexityBoard.module.scss';
import ComplexityRadio from './CoplexityRadio';

const ComplexityBoard: FC = () => {
	return (
		<>
			<div className={styles.container}>
				<h2 className={styles.title}>Вибери рівень ELO</h2>
				<form className={styles.radios}>
					<ComplexityRadio depth={1} elo={600} />
					<ComplexityRadio depth={2} elo={800} />
					<ComplexityRadio depth={3} elo={1000} />
					<ComplexityRadio depth={4} elo={1300} />
					<ComplexityRadio depth={5} elo={1600} />
					<ComplexityRadio depth={6} elo={1900} />
					<ComplexityRadio depth={7} elo={2300} />
					<ComplexityRadio depth={8} elo={2500} />
					<ComplexityRadio depth={9} elo={2700} />
					<ComplexityRadio depth={10} elo={2900} />
				</form>
			</div>
		</>
	);
};

export default ComplexityBoard;
