import { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ChessModes from '../../enums/ChessModes';
import useApp from '../../hooks/reduxSelelectors/useApp';
import { CellView } from '../../types/CellView';
import ChessCell from '../ChessCell/ChessCell';

interface DefaultChessBoardProps {
	cells: CellView[][];
	highlightedMoves: CellView[];
	onCellClick?: (row: number, col: number) => void;
	cellSize?: number;
}

const DefaultChessBoard: FC<DefaultChessBoardProps> = ({ cells, highlightedMoves, cellSize = 1.5 }) => {
	const { mode } = useApp();
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

	const groupRef = useRef<THREE.Group>(null);
	const [rotation, setRotation] = useState(0);

	useEffect(() => {
		if (mode === ChessModes.DEMO) {
			let frameId: number;
			const animate = () => {
				setRotation(prev => prev + 0.0025);
				frameId = requestAnimationFrame(animate);
			};
			frameId = requestAnimationFrame(animate);

			return () => cancelAnimationFrame(frameId);
		}
	}, [mode]);

	return (
		<group position={[0, 0, 0]} ref={groupRef} rotation={[0, rotation, 0]}>
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
