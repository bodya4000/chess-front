import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const useChessGame = () => {
	return useSelector((state: RootState) => state.chessGame);
};

export default useChessGame;
