import { FC, useMemo } from 'react';
import useBoardAnimation from '../../../../components/hooks/useBoardAnimation';
import ChessModes from '../../enums/ChessModes';
import useApp from '../../hooks/reduxSelelectors/useApp';
import { CellView } from '../../types/CellView';
import BotChessCell from '../ChessCells/BotChessCell';
import DemoChessCell from '../ChessCells/DemoChessCell';
import OnlineChessCell from '../ChessCells/OnlineChessCell';
import SingleChessCell from '../ChessCells/SingleChessCell';

interface DefaultChessBoardProps {
	cells: CellView[][];
	highlightedMoves: CellView[];
	onCellClick?: (row: number, col: number) => void;
	cellSize?: number;
}

const DefaultChessBoard: FC<DefaultChessBoardProps> = ({ cells, highlightedMoves, cellSize = 1.5 }) => {
	const { mode } = useApp();
	const boardSize = useMemo(() => cellSize * 8, [cellSize]);
	const borderThickness = useMemo(() => 0.5, []);
	const borderHeight = useMemo(() => 0.6, []);

	const createChessBoard = () => {
		const squares = [];
		if (cells) {
			for (let row = 0; row < cells.length; row++) {
				for (let col = 0; col < cells[row].length; col++) {
					const cellView = cells[row][col];
					const isHighlighted = highlightedMoves.some(view => view.row == cellView.row && view.col == cellView.col);

					switch (mode) {
						case ChessModes.DEMO: {
							squares.push(<DemoChessCell key={`${row}-${col}`} cell={cells[row][col]} position={[col * cellSize - (boardSize - cellSize) / 2, 0, row * cellSize - (boardSize - cellSize) / 2]} />);
							break;
						}
						case ChessModes.SINGLE: {
							squares.push(<SingleChessCell key={`${row}-${col}`} highlighted={isHighlighted} cell={cells[row][col]} position={[col * cellSize - (boardSize - cellSize) / 2, 0, row * cellSize - (boardSize - cellSize) / 2]} />);
							break;
						}
						case ChessModes.BOT: {
							squares.push(<BotChessCell key={`${row}-${col}`} highlighted={isHighlighted} cell={cells[row][col]} position={[col * cellSize - (boardSize - cellSize) / 2, 0, row * cellSize - (boardSize - cellSize) / 2]} />);
							break;
						}
						case ChessModes.ONLINE: {
							squares.push(<OnlineChessCell key={`${row}-${col}`} highlighted={isHighlighted} cell={cells[row][col]} position={[col * cellSize - (boardSize - cellSize) / 2, 0, row * cellSize - (boardSize - cellSize) / 2]} />);
							break;
						}
					}
				}
			}
		}
		return squares;
	};

	const { rotation } = useBoardAnimation(mode);

	return (
		<group position={[0, 0, 0]} rotation={[0, rotation, 0]}>
			{createChessBoard()}

			{/* Borders */}
			{/* Top Border */}
			<mesh position={[0, borderHeight / 2 - 0.2, -boardSize / 2 - borderThickness / 2]}>
				<boxGeometry args={[boardSize + borderThickness * 2, borderHeight, borderThickness]} />
				<meshStandardMaterial color='black' />
			</mesh>

			{/* Bottom Border */}
			<mesh position={[0, borderHeight / 2 - 0.2, boardSize / 2 + borderThickness / 2]}>
				<boxGeometry args={[boardSize + borderThickness * 2, borderHeight, borderThickness]} />
				<meshStandardMaterial color='black' />
			</mesh>

			{/* Left Border */}
			<mesh position={[-boardSize / 2 - borderThickness / 2, borderHeight / 2 - 0.2, 0]}>
				<boxGeometry args={[borderThickness, borderHeight, boardSize]} />
				<meshStandardMaterial color='black' />
			</mesh>

			{/* Right Border */}
			<mesh position={[boardSize / 2 + borderThickness / 2, borderHeight / 2 - 0.2, 0]}>
				<boxGeometry args={[borderThickness, borderHeight, boardSize]} />
				<meshStandardMaterial color='black' />
			</mesh>

			<gridHelper args={[8, 8]} position={[0, 0, 0]} />
		</group>
	);
};

export default DefaultChessBoard;
