import { FC } from 'react';
import { useDispatch } from 'react-redux';
import useChess from '../../hooks/useChess';
import Color from '../../models/Color';
import { getHighlightMoves } from '../../state/ChessState';

interface FigureComponentProps {
	figure?: { type: string; color: string } | null;
	row: number;
	col: number;
}

const FigureComponent: FC<FigureComponentProps> = ({ figure, row, col }) => {
	const dispatch = useDispatch();
	const { turn } = useChess();

	if (!figure) {
		return null;
	}

	const getImagePath = (figure: { type: string; color: string } | null): string => {
		const name = figure?.type.toLocaleLowerCase();
		return `/assets/images/${name}${figure?.color === Color.BLACK ? '-2' : ''}.png`;
	};

	const onFigureClick = () => {
		if (turn == figure.color ) {			
			dispatch(getHighlightMoves({ row, col }));
		}
	};

	return (
		<div onClick={onFigureClick}>
			<img src={getImagePath(figure)} alt={`${figure.color} ${figure.type}`} />
		</div>
	);
};

export default FigureComponent;
