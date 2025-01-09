import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const useBotChessBoard = () => {
	return useSelector((state: RootState) => state.botChessBoard);
};

export default useBotChessBoard;
