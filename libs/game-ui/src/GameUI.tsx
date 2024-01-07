import React from 'react';
import { GameUIProps } from './GameUI.types';
import { WebsocketContextProvider } from '@imagine-cms/websocket';
import { PlayerStatsBar } from './player-stats-bar/PlayerStatsBar';
import { GameUIContainer, GameUIElement } from './GameUI.styled';
import { GameInfoBar } from './game-info-bar/GameInfoBar';
import { ClickedPlayerStatsBar } from './clicked-player-stats-bar/ClickedPlayerStatsBar';

export function GameUI({ ssoTicket }: GameUIProps) {
  return (
    <WebsocketContextProvider ssoTicket={ssoTicket}>
      <GameUIElement>
        <GameUIContainer>
          <GameInfoBar />
          <PlayerStatsBar />
          <ClickedPlayerStatsBar />
        </GameUIContainer>
      </GameUIElement>
    </WebsocketContextProvider>
  )
}