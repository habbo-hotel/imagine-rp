import DayJS from 'dayjs';
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
  const [lastUpdatedAt, setLastUpdatedAt] = useState<DayJS.Dayjs>();
  const [clickedPlayer, setClickedPlayer] = useState<ClickedPlayer>();

  const { client } = useContext(websocketContext);

  async function onStatsReceived(newClickedPlayer: any) {
    const parsedPlayerStats = parseClickedPlayerStats(newClickedPlayer);
    if (parsedPlayerStats.userID === session?.id) {
      return;
    }
    const currentTimestamp = DayJS();
    setLastUpdatedAt(currentTimestamp);
    setClickedPlayer(parsedPlayerStats);
  }

  function onClickedPlayerExpired() {
    if (!lastUpdatedAt) {
      return;
    }
    const lastUpdateDifference = DayJS().diff(lastUpdatedAt, 'second')
    console.log(lastUpdateDifference)
    const lastUpdateExpired = lastUpdateDifference > THIRTY_SECONDS;
    if (!lastUpdateExpired) {
      return;
    }
    setLastUpdatedAt(undefined);
    setClickedPlayer(undefined);
  }

  useEffect(() => {
    client.registerCallback('character_bar', onStatsReceived)
    const checkExpirationInterval = setInterval(onClickedPlayerExpired, FIVE_SECONDS_IN_MS)
    return (() => clearInterval(checkExpirationInterval));
  }, []);


  if (!clickedPlayer) {
    return null;
  }


  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
      <i className="fa fa-swords fa-2x" style={{ marginRight: 16 }} />
      <PlayerStatsBar player={clickedPlayer} showHunger={false} />
    </div>
  )
}