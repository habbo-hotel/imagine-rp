import { sessionContext } from '@imagine-cms/web';
import { websocketContext } from '@imagine-cms/websocket';
import { ClickedPlayer } from './ClickedPlayerStatsBar.types';
import React, { useContext, useEffect, useState } from 'react';
import { parseClickedPlayerStats } from './ClickedPlayerStatsBar.const';
import { PlayerStatsBar } from '../player-stats-bar/PlayerStatsBar';

export function ClickedPlayerStatsBar() {
  const { session } = useContext(sessionContext);
  const [clickedPlayer, setClickedPlayer] = useState<ClickedPlayer>();

  const { client } = useContext(websocketContext);

  async function onStatsReceived(newClickedPlayer: any) {
    const parsedPlayerStats = parseClickedPlayerStats(newClickedPlayer);
    if (parsedPlayerStats.userID === session?.id) {
      return;
    }
    setClickedPlayer(parsedPlayerStats);
  }

  useEffect(() => {
    client.registerCallback('character_bar', onStatsReceived)
  }, []);

  if (!clickedPlayer) {
    return null;
  }


  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
      <span style={{ color: 'red', fontWeight: 'bold', marginRight: 16 }}>vs</span>
      <PlayerStatsBar player={clickedPlayer} />
    </div>
  )
}