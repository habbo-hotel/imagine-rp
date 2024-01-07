import { sessionContext } from '@imagine-cms/web';
import { websocketContext } from '@imagine-cms/websocket';
import React, { useContext, useEffect, useState } from 'react';
import { PlayerStatsBar } from '../player-stats-bar/PlayerStatsBar';
import { parseClickedPlayerStats } from '../clicked-player-stats-bar/ClickedPlayerStatsBar.const';
import { ClickedPlayer } from '../clicked-player-stats-bar/ClickedPlayerStatsBar.types';

export function MyStatsBar() {
  const { session } = useContext(sessionContext);
  const [clickedPlayer, setClickedPlayer] = useState<ClickedPlayer>();

  const { client } = useContext(websocketContext);

  async function onStatsReceived(newClickedPlayer: any) {
    const parsedPlayerStats = parseClickedPlayerStats(newClickedPlayer);
    if (parsedPlayerStats.userID !== session?.id) {
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


  return <PlayerStatsBar player={clickedPlayer} />
}