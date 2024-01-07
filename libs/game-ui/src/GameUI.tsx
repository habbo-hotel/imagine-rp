import React from 'react';
import { GameUIProps } from './GameUI.types';
import { MyStatsBar } from './my-stats-bar/MyStatsBar';
import { GameUIContainer, GameUIElement } from './GameUI.styled';
import { WebsocketContextProvider } from '@imagine-cms/websocket';
import { GameClientActions } from './game-client-actions/GameClientActions';
import { ClickedPlayerStatsBar } from './clicked-player-stats-bar/ClickedPlayerStatsBar';

export function GameUI({ ssoTicket }: GameUIProps) {
  return (
    <WebsocketContextProvider ssoTicket={ssoTicket}>
      <GameUIElement>
        <GameUIContainer>
          <GameClientActions />
          <MyStatsBar />
          <ClickedPlayerStatsBar />
        </GameUIContainer>
      </GameUIElement>
    </WebsocketContextProvider>
  )
}