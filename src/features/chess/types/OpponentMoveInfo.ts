import Figures from '../models/enums/Figures'
import { Coordinates } from './Coordinates'

export type OpponentMoveInfo = {
	coordinates: Coordinates,
	promotionFigureName?: Figures
}