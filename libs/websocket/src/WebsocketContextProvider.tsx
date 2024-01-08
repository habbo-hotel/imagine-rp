import React, { useContext, useEffect, useMemo } from 'react';
import { WebSocketClient } from './Websocket.client';
import { configContext } from '@imagine-cms/web';
import { WebsocketContextProviderProps } from './WebsocketContext.types';
import { websocketContext } from './WebsocketContext';

export function WebsocketContextProvider({ children, ssoTicket }: WebsocketContextProviderProps) {
  const { config } = useContext(configContext);
  const client = useMemo(() => new WebSocketClient(config.websocketURL), [config.websocketURL]);

  async function onWebsocketConnected() {
    await client.connect();
    client.startPingInterval();
    if (!ssoTicket) {
      return;
    }
    await client.sendTextEvent('sup', ssoTicket);
  }

  useEffect(() => {
    onWebsocketConnected();
  }, [client]);

  return (
    <websocketContext.Provider value={{ client }}>
      {children}
    </websocketContext.Provider>
  );
}
