import DayJS from 'dayjs';
import { sessionContext } from '@imagine-cms/web';
import { websocketContext } from '@imagine-cms/websocket';
import { ClickedPlayer } from './ClickedPlayerStatsBar.types';
import React, { useContext, useEffect, useState } from 'react';
import { PlayerStatsBar } from '../player-stats-bar/PlayerStatsBar';
import { parseClickedPlayerStats } from './ClickedPlayerStatsBar.const';

const TWO_MINUTES_IN_SECONDS = 120;

export function ClickedPlayerStatsBar() {
  const { session } = useContext(sessionContext);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(0);
  const [clickedPlayer, setClickedPlayer] = useState<ClickedPlayer>();

  const { client } = useContext(websocketContext);

  async function onStatsReceived(newClickedPlayer: any) {
    const parsedPlayerStats = parseClickedPlayerStats(newClickedPlayer);
    if (parsedPlayerStats.userID === session?.id) {
      return;
    }
    setClickedPlayer(parsedPlayerStats);
    setLastUpdatedAt(DayJS().unix());
  }

  useEffect(() => {
    client.registerCallback('character_bar', onStatsReceived)
  }, []);

  const lastUpdateDifference = DayJS().diff(DayJS.unix(lastUpdatedAt), 'seconds');
  const lastUpdateExpired = lastUpdateDifference > TWO_MINUTES_IN_SECONDS;

  if (!clickedPlayer || lastUpdateExpired) {
    return null;
  }


  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
      <i className="fa fa-swords fa-2x" style={{ marginRight: 16 }} />
      <PlayerStatsBar player={clickedPlayer} />
    </div>
  )
}