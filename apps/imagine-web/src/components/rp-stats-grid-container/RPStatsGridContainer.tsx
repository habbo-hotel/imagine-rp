import React, { useEffect, useMemo } from 'react';
import { RPStatsGridContainerProps } from './RPStatsGridContainer.types';
import { useRPStatsFetchOne } from '@imagine-cms/client';
import { GridLarge } from '../grid/Grid.remix';
import { ArmorProgress, EnergyProgress, HealthProgress, HungerProgress } from './RPStatsGridContainer.styled';

function safeDiv(valueOne: number, valueTwo: number) {
  if (valueOne === 0 || valueTwo === 0) {
    return 0;
  }

  return Number((valueOne / valueTwo) * 100)
}

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

  const [healthCurrent, healthMax, energyCurrent, energyMax, hungerCurrent, hungerMax, armorCurrent, armorMax] = useMemo(() => {
    return [
      fetchRPStats.data?.healthCurrent ?? 0,
      fetchRPStats.data?.healthMax ?? 0,
      fetchRPStats.data?.energyCurrent ?? 0,
      fetchRPStats.data?.energyMax ?? 0,
      (fetchRPStats.data?.hungerMax ?? 0) - (fetchRPStats.data?.hungerCurrent ?? 0),
      fetchRPStats.data?.hungerMax ?? 0,
      (fetchRPStats.data?.armorMax ?? 0) - (fetchRPStats.data?.armorCurrent ?? 0),
      fetchRPStats.data?.armorMax ?? 0,
    ]
  }, [fetchRPStats.data]);

  const [healthPercent, energyPercent, hungerPercent, armorPercent] = useMemo(() => {
    return [
      safeDiv(healthCurrent, healthMax),
      safeDiv(energyCurrent, energyMax),
      safeDiv(hungerCurrent, hungerMax),
      safeDiv(armorCurrent, armorMax),
    ]
  }, [fetchRPStats.data]);

  return (
    <GridLarge>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label><i className="fa fa-heart" style={{ marginRight: 4 }} /> Health</label>
          <label>{healthPercent}%</label>
        </div>
        <HealthProgress value={healthCurrent} max={healthMax} percent={healthPercent}>
          {healthCurrent === 0 && <span style={{ color: 'red' }}>Visit a doctor</span>}
        </HealthProgress>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label><i className="fa fa-bolt" style={{ marginRight: 4 }} /> Energy</label>
          <label>{energyPercent}%</label>
        </div>
        <EnergyProgress value={energyCurrent} max={energyMax} percent={energyPercent}>
          {energyCurrent === 0 && <span style={{ color: 'red' }}>You have asthma</span>}
        </EnergyProgress>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label><i className="fa fa-utensils" style={{ marginRight: 4 }} /> Hunger</label>
          <label>{hungerPercent}%</label>
        </div>
        <HungerProgress value={hungerCurrent} max={hungerMax} percent={hungerPercent}>
          {hungerCurrent === 0 && <span style={{ color: 'red' }}>You are starving.</span>}
        </HungerProgress>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label><i className="fa fa-shield" style={{ marginRight: 4 }} /> Armor</label>
          <label>{armorPercent}%</label>
        </div>
        <ArmorProgress value={armorCurrent} max={armorMax} percent={armorPercent}>
          {armorMax === 0 && <span style={{ color: 'red' }}>You don't have any armor.</span>}
        </ArmorProgress>
      </div>
    </GridLarge>
  )
}