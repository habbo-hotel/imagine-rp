import { parseEventName, stringToBinary } from "./helpers";

type MessageCallback = (message: any) => void;

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private messageQueue: string[] = [];
  private callbacks: Map<string, MessageCallback> = new Map();

  constructor(private readonly url: string) { }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);

      this.ws.binaryType = 'blob';

      this.ws.onopen = () => {
        console.log('WebSocket: Connected to the server.');
        this.processQueue();
        resolve();
      };

      this.ws.onmessage = async (event) => {
        console.log(`WebSocket: Received ${event.data}`);
        const data = event.data.split('¡');
        const eventName = data.length > 0 ? data[0] : '';
        const eventData = data.length > 1 ? data[1] : '';
        console.log(`WebSocket: Processing as  ${eventName} and ${eventData}`);
        this.handleMessage(eventName, eventData);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket: Disconnected from the server.');
      };
    });
  }

  registerCallback(type: string, callback: MessageCallback): void {
    this.callbacks.set(type, callback);
  }

  private handleMessage(eventName: string, eventData: string): void {
    console.log(`WebSocket: Handling ${eventName} - ${eventData}`);
    const callback = this.callbacks.get(eventName);
    if (callback) {
      callback(eventData);
    }
  }

  sendRawEvent(message: string): void {
    console.log(`WebSocket: Sending ${message}`);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  startPingInterval(): void {
    setInterval(() => {
      this.sendPing();
    }, 30000); // 30000 milliseconds = 30 seconds
  }

  sendPing(): void {
    this.sendRawEvent(JSON.stringify({
      EventName: 'ping',
      Bypass: true,
      ExtraData: '',
      JSON: false
    }))
  }

  sendTextEvent(eventName: string, data: string): void {
    this.sendRawEvent(JSON.stringify({
      EventName: eventName,
      Bypass: true,
      ExtraData: data,
      JSON: false
    }))
  }

  sendJSONEvent(eventName: string, data: object): void {
    this.sendRawEvent(JSON.stringify({
      EventName: eventName,
      Bypass: false,
      ExtraData: false,
      JSON: data
    }))
  }


  private processQueue(): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.sendRawEvent(message);
      }
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}