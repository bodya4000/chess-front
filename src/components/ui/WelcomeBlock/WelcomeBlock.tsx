import React, { FC, useCallback } from 'react';
import ChessModes from '../../../features/chess/enums/ChessModes';
import { useAppDispatch } from '../../../features/chess/hooks/useAppDispatch';
import { setMode } from '../../../features/chess/state/AppSlice';
import styles from '../../sceens/Home.module.scss';

const WelcomeBlock: FC = React.memo(() => {
	const dispatch = useAppDispatch();
	const handleClick = useCallback(
		(mode: ChessModes) => {
			dispatch(setMode(mode));
		},
		[dispatch]
	);

	const modes = [
		{ mode: ChessModes.SINGLE, label: 'Друг' },
		{ mode: ChessModes.BOT, label: 'Компʼютер' },
		{ mode: ChessModes.ONLINE, label: 'Онлайн' },
	];

	return (
		<div role='dialog' aria-labelledby='modal-title' aria-describedby='modal-description' className={`${styles.user_welcome}`} aria-hidden={false}>
			<h2 id='modal-title'>Виберіть як хочете грати</h2>
			<div className={styles.btn_container}>
				{modes.map(({ mode, label }) => (
					<button key={mode} onClick={() => handleClick(mode)}>
						{label}
					</button>
				))}
			</div>
		</div>
	);
});

export default WelcomeBlock;
