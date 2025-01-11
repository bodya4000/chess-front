export type SocketEstablishMessage = {
	foundOpponent: boolean;
	sessionId: string;
	playerColor: 'Black' | 'White';
};
