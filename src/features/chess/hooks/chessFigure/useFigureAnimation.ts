import { SpringRef } from '@react-spring/three';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CellView } from '../../types/CellView';
import { setNewPos } from '../../state/ChessGameSlice'

interface Props {
	newPos: number[] | null;
	figureCell: CellView | null;
	id: number;
	api: SpringRef<{ position: number[] }>;
}
type Hook<Props> = (props: Props) => void;

const useFigureAnimation: Hook<Props> = ({ newPos, figureCell, id, api }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (newPos && figureCell?.figure?.id === id) {
			const targetPosition: [number, number, number] = [
				newPos[0], // col,
				0.2, // height
				newPos[2], // row
			];
			api.start({ position: targetPosition });
			dispatch(setNewPos(null));
		}
	}, [newPos, api, figureCell, id, dispatch]);
};

export default useFigureAnimation;
