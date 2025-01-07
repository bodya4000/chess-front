import { useDispatch } from 'react-redux';
import ChessCanvas from './features/chess/components/ChessCanvas/ChessCanvas';
import { revertMove } from './features/chess/state/ChessState';

function App() {
	const dispatch = useDispatch();
	const revert = () => {
		dispatch(revertMove());
	};
	return (
		<>
			<ChessCanvas />
			<button onClick={revert}>revert</button>
		</>
	);
}

export default App;
