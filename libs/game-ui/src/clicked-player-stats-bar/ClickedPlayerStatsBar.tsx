import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useRPStatsFetchOne } from '@imagine-cms/client';
import { sessionContext } from '@imagine-cms/web';
import { ClickedPlayer } from './ClickedPlayerStatsBar.types';
import { websocketContext } from '@imagine-cms/websocket';
import { safeDiv } from '../player-stats-bar/PlayerStatsBar.const';
import { PlayerStatsBarElement } from '../player-stats-bar/PlayerStatsBar.styled';

export function ClickedPlayerStatsBar() {
  const { session } = useContext(sessionContext);
  const [clickedPlayer, setClickedPlayer] = useState<ClickedPlayer>();
  const fetchRPStats = useRPStatsFetchOne();

  async function refresh() {
    if (!session?.id) {
      return
    }
    await fetchRPStats.fetch({ userID: session.id });
  }

  useEffect(() => {
    refresh();
  }, [session?.id]);

  const { client } = useContext(websocketContext);

  const [healthCurrent, energyCurrent, hungerCurrent, armorCurrent] = useMemo(() => [
    clickedPlayer?.healthCurrent ?? 0,
    clickedPlayer?.energyCurrent ?? 0,
    clickedPlayer?.hungerCurrent ?? 0,
    clickedPlayer?.armorCurrent ?? 0,
  ], [clickedPlayer]);

  const [healthMax, energyMax, hungerMax, armorMax] = useMemo(() => [
    fetchRPStats.data?.healthMax ?? 0,
    fetchRPStats.data?.energyMax ?? 0,
    fetchRPStats.data?.hungerMax ?? 0,
    fetchRPStats.data?.armorMax ?? 0,
  ], [fetchRPStats.data]);

  const [healthPercent, energyPercent, hungerPercent, armorPercent] = useMemo(() => {
    return [
      safeDiv(healthCurrent, healthMax),
      safeDiv(energyCurrent, energyMax),
      safeDiv(hungerCurrent, hungerMax),
      safeDiv(armorCurrent, armorMax),
    ]
  }, [fetchRPStats.data]);

  async function onStatsReceived(newClickedPlayer: any) {
    const parsedPlayer = newClickedPlayer(',');
    setClickedPlayer({
      userID: parsedPlayer[0],
      look: parsedPlayer[1],
      healthCurrent: parsedPlayer[2],
      energyCurrent: parsedPlayer[3],
      armorCurrent: parsedPlayer[4],
      hungerCurrent: parsedPlayer[5],
    });
  }

  useEffect(() => {
    client.registerCallback('character_bar', onStatsReceived)
  }, []);

  if (!clickedPlayer) {
    return null;
  }


  return (
    <PlayerStatsBarElement>
      <div className="progress-container">
        <div className="progress">
          <div className="progress-icon">💚</div>
          <div className="progress-bar health" style={{ width: `${healthPercent}%` }} >{healthCurrent}/{healthMax}</div>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress">
          <div className="progress-icon">👊</div>
          <div className="progress-bar energy" style={{ width: `${energyPercent}%` }}>{energyCurrent}/{energyMax}</div>
        </div>
      </div>
    </PlayerStatsBarElement>
  )
}