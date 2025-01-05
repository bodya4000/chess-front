import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const useChess = () => {
	return useSelector((state: RootState) => state.chess);
};

export default useChess;
