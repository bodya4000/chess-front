import { FC } from 'react';
import BotBoard from '../../features/chess/components/ChessBoards/BotBoard';
import DemoBoard from '../../features/chess/components/ChessBoards/DemoBoard';
import OnlineBoard from '../../features/chess/components/ChessBoards/OnlineBoard';
import SingleBoard from '../../features/chess/components/ChessBoards/SingleBoard';
import ChessCanvas from '../../features/chess/components/ChessCanvas/ChessCanvas';
import ChessModes from '../../features/chess/enums/ChessModes';
import useApp from '../../features/chess/hooks/reduxSelelectors/useApp';
import ComplexityBoard from '../ui/ComplexityBoard/ComplexityBoard';
import FigureBoard from '../ui/FigureBoard/FigureBoard';
import WaitingBlock from '../ui/WaitingBlock/WaitingBlock';
import WelcomeBlock from '../ui/WelcomeBlock/WelcomeBlock';

const Home: FC = () => {
	const { mode } = useApp();
	return (
		<>
			<WelcomeBlock />
			<WaitingBlock />
			<ComplexityBoard />
			<FigureBoard />
			<ChessCanvas>
				{mode === ChessModes.DEMO && <DemoBoard />}
				{mode === ChessModes.SINGLE && <SingleBoard />}
				{mode === ChessModes.BOT && <BotBoard />}
				{mode === ChessModes.ONLINE && <OnlineBoard />}
			</ChessCanvas>
		</>
	);
};

export default Home;
