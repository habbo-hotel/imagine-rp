import React from 'react';
import { GameUIProps } from './GameUI.types';
import { WebsocketContextProvider } from '@imagine-cms/websocket';

export function GameUI({ ssoTicket }: GameUIProps) {
  return (
    <WebsocketContextProvider ssoTicket={ssoTicket}>
      <div style={{ padding: 12 }}>
        game ui
      </div>
    </WebsocketContextProvider>
  )
}