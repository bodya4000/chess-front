import { FC } from 'react';

const ChessBoard: FC = () => {
	const createChessBoard = () => {
		const squares = [];
		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				const color = (row + col) % 2 === 0 ? 'white' : 'black';
				squares.push(
					<mesh key={`${row}-${col}`} position={[col - 3.5, 0, row - 3.5]}>
						<boxGeometry args={[1, 0.1, 1]} />
						<meshStandardMaterial color={color} />
					</mesh>
				);
			}
		}
		return squares;
	};

	return <group position={[0, 0, 0]}>{createChessBoard()}</group>;
};

export default ChessBoard;
