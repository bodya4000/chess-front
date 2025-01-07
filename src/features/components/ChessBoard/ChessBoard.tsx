import { FC } from 'react';
import useChess from '../../hooks/reduxSelelectors/useChess';
import ChessCell from '../ChessCell/ChessCell';

const ChessBoard: FC = () => {
	const { board, oldBoard, highlightedMoves } = useChess();
	const cells = board?.cells ?? null;
	const cellSize = 1.5; // Size of each cell
	const boardSize = cellSize * 8; // Total size of the board
	const borderThickness = 0.5; // Thickness of the border
	const borderHeight = 0.6; // Height of the border

	const createChessBoard = () => {
		const squares = [];
		if (cells) {
			for (let row = 0; row < cells.length; row++) {
				for (let col = 0; col < cells[row].length; col++) {
					const cellView = cells[row][col];
					const isHighlighted = highlightedMoves.some(view => view.row == cellView.row && view.col == cellView.col);
					squares.push(<ChessCell key={`${row}-${col}`} highlighted={isHighlighted} cell={cells[row][col]} position={[col * cellSize - (boardSize - cellSize) / 2, 0, row * cellSize - (boardSize - cellSize) / 2]} />);
				}
			}
		}
		return squares;
	};

	return (
		<group position={[0, 0, 0]}>
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

export default ChessBoard;
