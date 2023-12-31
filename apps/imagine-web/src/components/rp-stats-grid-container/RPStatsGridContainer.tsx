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

  const [currHealth, maxHealth] = [
    fetchRPStats.data?.health ?? 0,
    100
  ]

  const [currEnergy, maxEnergy] = [
    fetchRPStats.data?.energy ?? 0,
    100,
  ]

  const [currHunger, maxHunger] = [
    fetchRPStats.data?.energy ?? 0,
    100,
  ]

  const [currArmor, maxArmor] = [
    fetchRPStats.data?.energy ?? 0,
    100,
  ]

  return (
    <GridLarge>
      <div style={{ width: '100%' }}>
        <label>Health</label>
        <br />
        <HealthProgress value={currEnergy} max={maxEnergy}> {currEnergy}% </HealthProgress>
      </div>
      <div>
        <label>Energy</label>
        <br />
        <EnergyProgress value={currEnergy} max={maxEnergy}> {currEnergy}% </EnergyProgress>
      </div>
      <div>
        <label>Hunger</label>
        <br />
        <HungerProgress value={currHunger} max={maxHunger}> {currHunger}% </HungerProgress>
      </div>
      <div>
        <label>Armor</label>
        <br />
        <ArmorProgress value={currArmor} max={maxArmor}> {currArmor}% </ArmorProgress>
      </div>
    </GridLarge>
  )
}