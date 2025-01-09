import { FC } from 'react';
import { CellView } from '../../types/CellView';
import ChessFigure from '../ChessFigure/ChessFigure';

interface DefaultChessCellProps {
	onClick: () => void;
	cell: CellView;
	currentFigureCell: CellView | null;
	highlighted?: boolean;
	position: [number, number, number];
}

const DefaultChessCell: FC<DefaultChessCellProps> = ({ onClick, cell, currentFigureCell, highlighted, position }) => {
	return (
		<mesh onClick={onClick} key={`${cell.row}-${cell.col}`} position={position}>
			<boxGeometry args={[1.5, 0.35, 1.5]} />
			<meshStandardMaterial color={highlighted ? 'yellow' : cell.color} />
			{cell.figure && <ChessFigure figureCell={currentFigureCell} id={cell.figure.id} figure={cell.figure.type} color={cell.figure.color} />}
		</mesh>
	);
};

export default DefaultChessCell;
