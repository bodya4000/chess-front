import { FC } from 'react';
import styles from './ComplexityBoard.module.scss';
import { useAppDispatch } from '../../../features/chess/hooks/useAppDispatch'
import { setDepth } from '../../../features/chess/state/BotChessBoardSlice'

interface ComplexityRadioProps {
	elo: number;
	depth: number;
}

const ComplexityRadio: FC<ComplexityRadioProps> = ({ elo, depth }) => {
	const dispatch = useAppDispatch();

	const onClick = () => {
		dispatch(setDepth(depth));
		const radio = document.getElementById(String(elo)) as HTMLInputElement;
		if (radio) {
			radio.checked = true;
		}
	};

	return (
		<div className={styles.radio} onClick={onClick}>
			<input name='elo' id={String(elo)} type='radio' className={styles.input} />
			<label htmlFor={String(elo)}>{elo}</label>
		</div>
	);
};

export default ComplexityRadio;
