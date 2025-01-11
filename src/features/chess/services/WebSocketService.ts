import { Client, IFrame, IMessage, StompHeaders, StompSubscription } from '@stomp/stompjs';

class WebSocketService {
	private static readonly BASE_URL = "ws://192.168.0.101:8081/";
	private client: Client;

	constructor(brokerEndpoint: string, reconnectDelay: number) {
		this.client = new Client({
			brokerURL: WebSocketService.BASE_URL + brokerEndpoint,
			reconnectDelay,
		});
	}

	connect(onConnect: () => void, onError: (frame: IFrame) => void): void {
		this.client.onConnect = onConnect;
		this.client.onStompError = onError;
		this.client.activate();
	}

	subscribe(destination: string, callback: (message: IMessage) => void): StompSubscription {
		return this.client.subscribe(destination, callback);
	}

	publish(destination: string, body?: string, headers?: StompHeaders): void {
		this.client.publish({
			destination,
			body,
			headers,
		});
	}

	disconnect(): void {
		this.client.deactivate();
	}
}

export default WebSocketService;
