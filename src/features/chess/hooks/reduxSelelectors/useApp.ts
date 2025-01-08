import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const useApp = () => {
	return useSelector((state: RootState) => state.app);
};

export default useApp;
