import { FC, memo } from 'react';
import { CellView } from '../../types/CellView';
import DefaultChessCell from './DefaultChessCell';

interface ChessCellProps {
	cell: CellView;
	position: [number, number, number];
}

const DemoChessCell: FC<ChessCellProps> = memo(
	({ cell, position }) => {
		return <DefaultChessCell onClick={() => {}} cell={cell} currentFigureCell={null} highlighted={false} position={position} />;
	},
	(prevProps, nextProps) => {
		return prevProps.cell === nextProps.cell && prevProps.position[0] === nextProps.position[0] && prevProps.position[1] === nextProps.position[1] && prevProps.position[2] === nextProps.position[2];
	}
);

export default DemoChessCell;
