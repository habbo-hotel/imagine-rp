import React from 'react';
import { GameUIProps } from './GameUI.types';
import { WebsocketContextProvider } from '@imagine-cms/websocket';
import { GameUIContainer, GameUIElement } from './GameUI.styled';
import { GameInfoBar } from './game-info-bar/GameInfoBar';
import { ClickedPlayerStatsBar } from './clicked-player-stats-bar/ClickedPlayerStatsBar';
import { MyStatsBar } from './my-stats-bar/MyStatsBar';

export function GameUI({ ssoTicket }: GameUIProps) {
  return (
    <WebsocketContextProvider ssoTicket={ssoTicket}>
      <GameUIElement>
        <GameUIContainer>
          <GameInfoBar />
          <MyStatsBar />
          <ClickedPlayerStatsBar />
        </GameUIContainer>
      </GameUIElement>
    </WebsocketContextProvider>
  )
}