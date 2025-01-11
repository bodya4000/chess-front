class Generator {
	static generateSessionId() {
		const randomSixSymbols = Array.from({ length: 6 }, () => Math.random().toString(36).charAt(2)).join('');
		const currentTime = Date.now();
		return `${currentTime}:${randomSixSymbols}`;
	}
}

export default Generator;
