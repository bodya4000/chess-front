import { FC } from 'react';
import { CellView } from '../../types/CellView';
import DefaultChessCell from './DefaultChessCell';

interface ChessCellProps {
	cell: CellView;
	position: [number, number, number];
}

const DemoChessCell: FC<ChessCellProps> = ({ cell, position }) => {
	return <DefaultChessCell onClick={() => {}} cell={cell} currentFigureCell={null} highlighted={false} position={position} />;
};

export default DemoChessCell;
