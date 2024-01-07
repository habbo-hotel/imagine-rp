import { useLocation } from 'wouter';
import { themeContext } from '@imagine-cms/web';
import { Avatar } from '@imagine-cms/shared-ui';
import { safeDiv } from './PlayerStatsBar.const';
import { PlayerStatsBarProps } from './PlayerStatsBar.types';
import React, { useContext, useEffect, useMemo } from 'react';
import { PlayerStatsBarElement } from './PlayerStatsBar.styled';
import { useRPStatsFetchOne, useUserFetchOne } from '@imagine-cms/client';

function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function PlayerStatsBar({ player }: PlayerStatsBarProps) {
  const [, setLocation] = useLocation();
  const { setTheme } = useContext(themeContext);
  const fetchUser = useUserFetchOne();
  const fetchRPStats = useRPStatsFetchOne();

  const [healthCurrent, energyCurrent] = useMemo(() => [
    player?.healthCurrent ?? 0,
    player?.energyCurrent ?? 0,
  ], [player]);

  const [healthMax, energyMax] = useMemo(() => [
    fetchRPStats.data?.healthMax ?? 0,
    fetchRPStats.data?.energyMax ?? 0,
  ], [fetchRPStats.data]);

  const [healthPercent, energyPercent] = useMemo(() => {
    return [
      safeDiv(healthCurrent, healthMax),
      safeDiv(energyCurrent, energyMax),
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
    await Promise.all([
      fetchUser.fetch({ id: player.userID }),
      fetchRPStats.fetch({ userID: player.userID }),
    ])
  }

  useEffect(() => {
    refresh();
  }, [player?.userID]);


  return (
    <PlayerStatsBarElement>
      <div className="user-container" onClick={onViewProfile}>
        <Avatar style={{ background: fetchUser.data?.rank?.backgroundColor, height: 60 }} look={player.look} headOnly />
        <h6>{player.username}</h6>
      </div>
      <div>
        <div className="progress-container">
          <div className="progress">
            <div className="progress-icon">❤️</div>
            <div className="progress-bar health" style={{ width: `${healthPercent}%` }} >{formatNumber(healthCurrent)}/{formatNumber(healthMax)}</div>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress">
            <div className="progress-icon">👊</div>
            <div className="progress-bar energy" style={{ width: `${energyPercent}%` }}>{formatNumber(energyCurrent)}/{formatNumber(energyMax)}</div>
          </div>
        </div>
      </div>
    </PlayerStatsBarElement>
  )
}