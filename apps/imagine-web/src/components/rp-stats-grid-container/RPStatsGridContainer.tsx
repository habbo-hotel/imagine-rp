import React, { useEffect } from 'react';
import { RPStatsGridContainerProps } from './RPStatsGridContainer.types';
import { useRPStatsFetchOne } from '@imagine-cms/client';
import { GridLarge } from '../grid/Grid.remix';
import { ArmorProgress, EnergyProgress, HealthProgress, HungerProgress } from './RPStatsGridContainer.styled';

export function RPStatsGridContainer({ userID }: RPStatsGridContainerProps) {
  const fetchRPStats = useRPStatsFetchOne();

  async function refresh() {
    if (!userID) {
      return
    }
    await fetchRPStats.fetch({ userID });
  }

  useEffect(() => {
    refresh();
  }, [userID]);

  return (
    <GridLarge>
      <div style={{ width: '100%' }}>
        <label>Health</label>
        <br />
        <HealthProgress value={fetchRPStats.data?.healthCurrent ?? 0} max={fetchRPStats.data?.healthMax ?? 0}> {fetchRPStats.data?.healthCurrent ?? 0}% </HealthProgress>
      </div>
      <div>
        <label>Energy</label>
        <br />
        <EnergyProgress value={fetchRPStats.data?.energyCurrent ?? 0} max={fetchRPStats.data?.energyMax ?? 0}> {fetchRPStats.data?.energyCurrent ?? 0}% </EnergyProgress>
      </div>
      <div>
        <label>Hunger</label>
        <br />
        <HungerProgress value={fetchRPStats.data?.hungerCurrent ?? 0} max={fetchRPStats.data?.hungerMax ?? 0}> {fetchRPStats.data?.healthCurrent ?? 0}% </HungerProgress>
      </div>
      <div>
        <label>Armor</label>
        <br />
        <ArmorProgress value={fetchRPStats.data?.armorCurrent ?? 0} max={fetchRPStats.data?.armorMax ?? 0}> {fetchRPStats.data?.armorCurrent ?? 0}% </ArmorProgress>
      </div>
    </GridLarge>
  )
}