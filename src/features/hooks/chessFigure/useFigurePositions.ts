import { useContext } from 'react';
import { FigurePositionContext } from '../../contexts/FigurePositionsContext';

export const useFigurePositions = () => {
	const context = useContext(FigurePositionContext);
	if (!context) {
		throw new Error('useFigurePositions must be used within a FigurePositionProvider');
	}
	return context;
};
