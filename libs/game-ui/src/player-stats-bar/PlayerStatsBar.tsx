import { safeDiv } from './PlayerStatsBar.const';
import { useRPStatsFetchOne } from '@imagine-cms/client';
import { websocketContext } from '../../../websocket/src';
import { PlayerStatsBarElement } from './PlayerStatsBar.styled';
import React, { useContext, useEffect, useMemo } from 'react';
import { Avatar } from '../../../../apps/cerberus-web/src/blocks/avatar/Avatar';
import { PlayerStatsBarProps } from './PlayerStatsBar.types';

export function PlayerStatsBar({ player }: PlayerStatsBarProps) {
  const fetchRPStats = useRPStatsFetchOne();

  async function refresh() {
    if (!player?.userID) {
      return
    }
    await fetchRPStats.fetch({ userID: player.userID });
  }

  useEffect(() => {
    refresh();
  }, [player?.userID]);

  const { client } = useContext(websocketContext);

  const [healthCurrent, energyCurrent, hungerCurrent, armorCurrent] = useMemo(() => [
    player?.healthCurrent ?? 0,
    player?.energyCurrent ?? 0,
    player?.hungerCurrent ?? 0,
    player?.armorCurrent ?? 0,
  ], [player]);

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


  return (
    <PlayerStatsBarElement>
      <Avatar style={{ height: 60 }} look={player.look} headOnly />
      <div>
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
      </div>
    </PlayerStatsBarElement>
  )
}