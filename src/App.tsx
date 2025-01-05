import { useDispatch } from 'react-redux';
import BoardComponent from './features/components/Board/BoardComponent';
import { revertMove } from './features/state/ChessState';

function App() {
	const dispatch = useDispatch();
	const revert = () => {
		dispatch(revertMove());
	};
	return (
		<>
			<BoardComponent />

			<button onClick={revert}>revert</button>
		</>
	);
}

export default App;
