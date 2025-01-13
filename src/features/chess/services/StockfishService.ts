class StockfishService {
	private readonly BASE_URL = 'https://stockfish.online/api/s/v2.php';
	async getBotMove(fen: string, depth: number) {
		const url = `${this.BASE_URL}?fen=${fen}&depth=${depth}`;
		console.log(fen);
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Fetch error:', error);
			throw error;
		}
	}
}

export default StockfishService;
