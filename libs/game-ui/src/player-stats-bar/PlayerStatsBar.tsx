import { useLocation } from 'wouter';
import { themeContext } from '@imagine-cms/web';
import { Avatar } from '@imagine-cms/shared-ui';
import { safeDiv } from './PlayerStatsBar.const';
import { useRPStatsFetchOne } from '@imagine-cms/client';
import { PlayerStatsBarProps } from './PlayerStatsBar.types';
import React, { useContext, useEffect, useMemo } from 'react';
import { PlayerStatsBarElement } from './PlayerStatsBar.styled';

export function PlayerStatsBar({ player }: PlayerStatsBarProps) {
  const [, setLocation] = useLocation();
  const { setTheme } = useContext(themeContext);
  const fetchRPStats = useRPStatsFetchOne();

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

  function onViewProfile() {
    setTheme({ showClient: false });
    setLocation(`/profile/${player.username}`);
  }

  async function refresh() {
    if (!player?.userID) {
      return
    }
    await fetchRPStats.fetch({ userID: player.userID });
  }

  useEffect(() => {
    refresh();
  }, [player?.userID]);


  return (
    <PlayerStatsBarElement>
      <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onClick={onViewProfile}>
        <Avatar style={{ height: 60 }} look={player.look} headOnly />
        <h6 style={{ margin: 0 }}>{player.username}</h6>
      </div>
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