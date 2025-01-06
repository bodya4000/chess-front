import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { makeMove } from '../../state/ChessState';
import { CellView } from '../../types/CellView';
import ChessFigure from '../ChessFigure/ChessFigure';

interface ChessCellProps {
	cell: CellView;
	highlighted?: boolean;
	position: [number, number, number];
}

const ChessCell: FC<ChessCellProps> = ({ cell, highlighted, position }) => {
	const dispatch = useDispatch();
	const move = () => {
		if (highlighted) {
			const { row, col } = cell;
			dispatch(makeMove({ row, col }));
		}
	};
	return (
		<mesh key={`${cell.row}-${cell.col}`} position={position}>
			<boxGeometry args={[1.5, 0.35, 1.5]} />
			<meshStandardMaterial color={cell.color} />
			{cell.figure && <ChessFigure figure={cell.figure.type} color={cell.figure.color} position={position} />}
		</mesh>
	);
};

export default ChessCell;
