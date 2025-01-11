import Color from '../../models/enums/Color'

export const updateTurn = (turn: Color): Color => (turn === Color.WHITE ? Color.BLACK : Color.WHITE);
