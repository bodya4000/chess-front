import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { makeMove } from '../../state/ChessState';
import { CellView } from '../../types/CellView';
import FigureComponent from '../FigureComponent/FigureComponent';
import styles from './CellComponent.module.scss';

interface CellComponentProps {
	cell: CellView;
	highlighted?: boolean;
}

const CellComponent: FC<CellComponentProps> = ({ cell, highlighted }) => {
	const dispatch = useDispatch();
	const move = () => {
		if (highlighted) {
			const { row, col } = cell;
			dispatch(makeMove({ row, col }));
		}
	};
	return (
		<div onClick={move} className={`${styles.cell_wrapper} ${highlighted ? styles.highlighted : ''}`}>
			<div className={`${styles.cell} ${highlighted ? styles.cell_blue : cell.color === 'black' ? styles.cell_red : styles.cell_white}`}>{cell.figure && <FigureComponent figure={cell.figure} row={cell.row} col={cell.col} />}</div>
		</div>
	);
};

export default CellComponent;
