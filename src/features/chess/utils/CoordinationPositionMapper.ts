class CoordinationPositionMapper {
	private static readonly rowMapping: Record<string, number> = {
		'1': 0,
		'2': 1,
		'3': 2,
		'4': 3,
		'5': 4,
		'6': 5,
		'7': 6,
		'8': 7,
	};

	private static readonly columnMapping: Record<string, number> = {
		a: 7,
		b: 6,
		c: 5,
		d: 4,
		e: 3,
		f: 2,
		g: 1,
		h: 0,
	};

	private static readonly reverseRowMapping: Record<number, string> = Object.entries(CoordinationPositionMapper.rowMapping).reduce((acc, [key, value]) => {
		acc[value] = key;
		return acc;
	}, {} as Record<number, string>);

	private static readonly reverseColumnMapping: Record<number, string> = Object.entries(CoordinationPositionMapper.columnMapping).reduce((acc, [key, value]) => {
		acc[value] = key;
		return acc;
	}, {} as Record<number, string>);

	private static mapStringToRow(row: string): number | undefined {
		return CoordinationPositionMapper.rowMapping[row];
	}

	private static mapStringToCol(column: string): number | undefined {
		return CoordinationPositionMapper.columnMapping[column];
	}

	private static mapRowToString(row: number): string | undefined {
		return CoordinationPositionMapper.reverseRowMapping[row];
	}

	private static mapColToString(column: number): string | undefined {
		return CoordinationPositionMapper.reverseColumnMapping[column];
	}

	/**
	 * Converts string chessboard coordinates (e.g., "e2") to numeric row and column positions.
	 *
	 * @param coordinates - Chessboard coordinates as a string (e.g., "e2").
	 * @returns An object containing the numeric `row` and `col` positions in the matrix.
	 *
	 * Example:
	 * ```typescript
	 * const result = CoordinationPositionMapper.mapStringCoordinatesToMatrix('e2');
	 * console.log(result); // { row: 6, col: 4 }
	 * ```
	 */
	public static mapStringCoordinatesToMatrix(coordinates: string): { row: number; col: number } {
		const row = this.mapStringToRow(coordinates[1]);
		const col = this.mapStringToCol(coordinates[0]);
		if (row !== undefined && row !== null && col !== undefined && col !== null) {
			return { row, col };
		} else {
			return { row: -1, col: -1 };
		}
	}

	/**
	 * Converts numeric matrix positions (e.g., `{ rowPos: 6, colPos: 4 }`) back to chessboard coordinates (e.g., "e2").
	 *
	 * @param position - An object containing `rowPos` (numeric row) and `colPos` (numeric column) values.
	 * @returns The chessboard coordinates as a string (e.g., "e2"), or `undefined` if the inputs are invalid.
	 *
	 * Example:
	 * ```typescript
	 * const result = CoordinationPositionMapper.matrixToStringCoordinates({ rowPos: 6, colPos: 4 });
	 * console.log(result); // "e2"
	 * ```
	 */
	public static matrixToStringCoordinates({ row, col }: { row: number; col: number }): string {
		const rowPos: string | undefined = this.mapRowToString(row);
		const colPos: string | undefined = this.mapColToString(col);

		if (rowPos && colPos) {
			return colPos + rowPos;
		}
		return '';
	}

	public static get3DPositionMove(start: { row: number; col: number }, end: { row: number; col: number }, cellSize: number = 1.5): number[] {
		return [(end.col - start.col) * cellSize, 0.2, (end.row - start.row) * cellSize];
	}

	public static getInit3DPosition(): number[] {
		return [0, 0.2, 0];
	}
}

export default CoordinationPositionMapper;
