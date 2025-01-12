import Color from '../models/enums/Color';
import Figures from '../models/enums/Figures';
import { Coordinates } from './Coordinates'

export type PawnPromotionInfo = {
	row: number;
	col: number;
	color: Color;
	figure: Figures | null;
	fromCoordinates: Coordinates
};
