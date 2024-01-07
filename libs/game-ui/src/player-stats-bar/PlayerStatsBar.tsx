import { useLocation } from 'wouter';
import { themeContext } from '@imagine-cms/web';
import { Avatar } from '@imagine-cms/shared-ui';
import { safeDiv } from './PlayerStatsBar.const';
import { PlayerStatsBarProps } from './PlayerStatsBar.types';
import React, { useContext, useEffect, useMemo } from 'react';
import { PlayerStatsBarElement } from './PlayerStatsBar.styled';
import { useRPStatsFetchOne, useUserFetchOne } from '@imagine-cms/client';
import { GridLarge } from '../../../../apps/imagine-web/src/components/grid/Grid.remix';

export function PlayerStatsBar({ player, showHunger = true, showArmor = true }: PlayerStatsBarProps) {
  const [, setLocation] = useLocation();
  const { setTheme } = useContext(themeContext);
  const fetchUser = useUserFetchOne();
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
    100,
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
        <div style={{ display: 'flex', gap: 8 }}>
          {showHunger && (
            <div className="progress-container" style={{ width: '50%' }}>
              <div className="progress">
                <div className="progress-icon">🍽️</div>
                <div className="progress-bar energy" style={{ width: `${hungerPercent}%` }}>{hungerCurrent}/{hungerMax}</div>
              </div>
            </div>
          )}
          {showArmor && (
            <div className="progress-container" style={{ width: '50%' }}>
              <div className="progress">
                <div className="progress-icon">🛡️</div>
                <div className="progress-bar energy" style={{ width: `${armorPercent}%` }}>{armorCurrent}/{armorMax}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PlayerStatsBarElement>
  )
}