import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const useSingleChessBoard = () => {
	return useSelector((state: RootState) => state.singleChessBoard);
};

export default useSingleChessBoard;
