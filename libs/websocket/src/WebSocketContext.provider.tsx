import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { websocketContext } from './WebsocketContext';
import { EventHandler, WebsocketContextProviderProps } from './WebsocketContext.types';
import { configContext } from '@imagine-cms/web';

export const useWebSocket = () => {
  const context = useContext(websocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}

export function WebSocketContextProvider({ children }: WebsocketContextProviderProps) {
  const { config } = useContext(configContext);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const eventHandlers = useRef<Record<string, EventHandler[]>>({});

  const emitEvent = useCallback((eventName: string, data: any) => {
    eventHandlers.current[eventName]?.forEach(handler => handler(data));
  }, []);

  const on = useCallback((eventName: string, handler: EventHandler) => {
    if (!eventHandlers.current[eventName]) {
      eventHandlers.current[eventName] = [];
    }
    eventHandlers.current[eventName].push(handler);
  }, []);

  const off = useCallback((eventName: string, handler: EventHandler) => {
    eventHandlers.current[eventName] = eventHandlers.current[eventName]?.filter(h => h !== handler) ?? [];
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (socket) {
      socket.send(message);
    }
  }, [socket]);

  useEffect(() => {
    const ws = new WebSocket(config.websocketURL);

    ws.onopen = () => {
      console.log("WebSocket Connected");
      emitEvent('open', null);
    };

    ws.onmessage = (event: MessageEvent) => {
      console.log("WebSocket Message Received:", event.data);
      emitEvent('message', event.data);
    };

    ws.onerror = (event: Event) => {
      console.error("WebSocket Error:", event);
      emitEvent('error', event);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      emitEvent('close', null);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [config.websocketURL, emitEvent]);

  console.log(socket)

  return (
    <websocketContext.Provider value={{ sendMessage, on, off }}>
      {
        socket?.CLOSED && <div style={{ color: 'red', fontWeight: 'bold' }}>websocket connection failed</div>
      }
      {children}
    </websocketContext.Provider>
  );
};
