import axios from 'axios';

class StockfishService {
	private readonly BASE_URL = 'https://stockfish.online/api/s/v2.php';
	getBotMove(fen: string, depth: number) {
		const url = `${this.BASE_URL}?fen=${fen}&depth=${depth}`;
		console.log(fen);
		return axios.get(url);
	}
}

export default StockfishService;
