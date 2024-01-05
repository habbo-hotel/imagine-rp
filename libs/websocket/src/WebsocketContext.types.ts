import { ReactNode } from "react";

export type EventHandler = (data: any) => void;

export interface WebSocketContext {
  sendMessage: (message: string) => void;
  on: (eventName: string, handler: EventHandler) => void;
  off: (eventName: string, handler: EventHandler) => void;
}

export const defaultWebsocketContext: WebSocketContext = {
  sendMessage: (message: string) => { },
  on: (eventName: string, handler: EventHandler) => { },
  off: (eventName: string, handler: EventHandler) => { },
}

export interface WebsocketContextProviderProps {
  children: ReactNode;
}