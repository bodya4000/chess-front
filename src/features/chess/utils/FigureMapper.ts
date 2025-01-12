import Figures from '../models/enums/Figures';

class FigureMapper {
	/**
	 * Maps the promotion figure's first symbol (e.g., 'q', 'r') to the corresponding figure enum.
	 * @param symbol - The first symbol representing the promoted figure (e.g., 'q' for Queen).
	 * @returns The corresponding figure from the `Figures` enum.
	 */
	public static mapPromotionFigure(symbol: string): Figures {
		switch (symbol.toLocaleLowerCase()) {
			case 'q':
				return Figures.Queen;
			case 'r':
				return Figures.Rook;
			case 'b':
				return Figures.Bishop;
			case 'n':
				return Figures.Knight;
			default:
				throw new Error('Unexpected promotion figure symbol!');
		}
	}

	public static mapPromotionFigureToSymbol(figureName: Figures): string {
		switch (figureName) {
			case Figures.Queen:
				return 'Q';
			case Figures.Rook:
				return 'R';
			case Figures.Bishop:
				return 'B';
			case Figures.Knight:
				return 'N';
			default:
				throw new Error('Unexpected promotion figure symbol!');
		}
	}
}

export default FigureMapper;
