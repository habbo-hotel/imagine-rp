import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ArmorProgress, EnergyProgress, HealthProgress, HungerProgress, PlayerStatsBarElement } from './PlayerStatsBar.styled';
import { websocketContext } from '../../../websocket/src';
import { PlayerStats } from './PlayerStatsBar.types';
import { safeDiv } from './PlayerStatsBar.const';
import { useRPStatsFetchOne } from '@imagine-cms/client';
import { sessionContext } from '@imagine-cms/web';
import { GridLarge } from '../../../../apps/imagine-web/src/components/grid/Grid.remix';

export function PlayerStatsBar() {
  const { session } = useContext(sessionContext);
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
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    healthCurrent: 0,
    energyCurrent: 0,
    hungerCurrent: 0,
    armorCurrent: 0,
  })

  const [healthCurrent, energyCurrent, hungerCurrent, armorCurrent] = useMemo(() => [
    playerStats.healthCurrent,
    playerStats.energyCurrent,
    playerStats.hungerCurrent,
    playerStats.armorCurrent,
  ], [playerStats]);

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

  async function onStatsReceived(newPlayerStats: any) {
    const parsedStats = newPlayerStats(',');
    setPlayerStats({
      healthCurrent: parsedStats[0],
      energyCurrent: parsedStats[1],
      hungerCurrent: parsedStats[2],
      armorCurrent: parsedStats[3],
    });
  }

  useEffect(() => {
    client.registerCallback('character_bar', onStatsReceived)
  }, []);


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