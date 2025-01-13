import { FC } from 'react';
import styles from './WhiteButton.module.scss';

interface WhiteButtonProps {
	className?: string;
	mode?: string;
	onClick: () => void;
	label: string;
}

const WhiteButton: FC<WhiteButtonProps> = ({ mode, onClick, label, className }) => {
	return (
		<button className={`${styles.btn} ${className}`} key={mode} onClick={onClick}>
			{label}
		</button>
	);
};

export default WhiteButton;
