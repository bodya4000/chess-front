import { FC } from 'react';
import useChess from '../../hooks/useChess';
import { CellView } from '../../types/CellView';
import CellComponent from '../Cell/CellComponent';
import styles from './BoardComponent.module.scss';

interface BoardComponentProps {
	propName?: string;
}

const BoardComponent: FC<BoardComponentProps> = () => {
	const { board, highlightedMoves } = useChess();	
	return (
		<div className={styles.board}>
			<div className={styles.board_container}>
				{board?.cells.map((row: CellView[], rowIndex: number) => (
					<div key={rowIndex} className={styles.board_row}>
						{row.map((cell: CellView, colIndex: number) => (
							<CellComponent highlighted={highlightedMoves.some(highlightedCell => highlightedCell.row === cell.row && highlightedCell.col === cell.col)} key={`${rowIndex}-${colIndex}`} cell={cell} />
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default BoardComponent;
