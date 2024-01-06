import { isJSON } from "./helpers";

type MessageCallback = (message: any) => void;

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private messageQueue: string[] = [];
  private callbacks: Map<string, MessageCallback> = new Map();

  constructor(private readonly url: string) { }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('Connected to the server.');
        this.processQueue();
        resolve();
      };

      this.ws.onmessage = (event) => {
        console.log('WebSocket msg:', event.data);

        if (isJSON(event.data)) {
          const message = JSON.parse(event.data)
          if (message.event === undefined) {
            return
          }
        }

        let eventData = event.data.split('¡')
        let eventName = String(eventData[0]).trim()

        this.handleMessage(eventName, eventData);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      this.ws.onclose = () => {
        console.log('Disconnected from the server.');
      };
    });
  }

  registerCallback(type: string, callback: MessageCallback): void {
    this.callbacks.set(type, callback);
  }

  private handleMessage(eventName: string, eventData: string): void {
    const callback = this.callbacks.get(eventName);
    if (callback) {
      callback(eventData);
    }
  }

  sendRawEvent(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      this.messageQueue.push(message);
    }
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