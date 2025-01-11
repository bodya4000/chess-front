import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const useOnlineChessBoard = () => {
	return useSelector((state: RootState) => state.onlineChessBoard);
};

export default useOnlineChessBoard;
