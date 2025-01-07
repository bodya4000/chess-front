import Cell from '../cell/Cell';
import Figure from '../figures/Figure';

class MoveInfo {
	readonly figure: Figure;
	readonly captured: Figure | null;
	readonly from: Cell;
	readonly to: Cell;

	constructor(figure: Figure, captured: Figure | null, from: Cell, to: Cell) {
		this.figure = figure;
		this.captured = captured;
		this.from = from;
		this.to = to;
	}

	toString(): string {
		return `Move ${this.figure} from ${this.from.toString()} to ${this.to.toString()} ${this.captured ? `capturing ${this.captured.getFigureName()}` : ''}`;
	}
}

export default MoveInfo;
