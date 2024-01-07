import { sessionContext } from '@imagine-cms/web';
import { websocketContext } from '@imagine-cms/websocket';
import { ClickedPlayer } from './ClickedPlayerStatsBar.types';
import React, { useContext, useEffect, useState } from 'react';
import { PlayerStatsBar } from '../player-stats-bar/PlayerStatsBar';
import { parseClickedPlayerStats } from './ClickedPlayerStatsBar.const';

const FIVE_SECONDS_IN_MS = 5000;
const THIRTY_SECONDS = 30;

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

  function onHideClickedPlayer() {
    setClickedPlayer(undefined);
  }

  useEffect(() => {
    client.registerCallback('character_bar', onStatsReceived)
  }, []);


  if (!clickedPlayer) {
    return null;
  }


  return (
    <div style={{ alignItems: 'center', cursor: 'pointer', display: 'flex', justifyContent: 'center' }} onClick={onHideClickedPlayer}>
      <i className="fa fa-swords fa-2x" style={{ marginRight: 16 }} />
      <PlayerStatsBar player={clickedPlayer} />
    </div>
  )
}