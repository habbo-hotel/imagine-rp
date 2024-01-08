import { ReactNode } from 'react';
import { WebSocketClient } from './Websocket.client';

export interface WebsocketContext {
  client: WebSocketClient;
}

export const defaultWebsocketContextInterface: WebsocketContext = {
  client: {} as any,
};

export interface WebsocketContextProviderProps {
  children: ReactNode;
  ssoTicket?: string;
}
