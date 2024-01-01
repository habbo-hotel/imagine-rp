import gql from "graphql-tag";
export const RP_STATS_FRAGMENT: any = gql`
  fragment RPStatsFragment on RPStatsModel {
    userID
    healthCurrent
    healthMax
    hungerCurrent
    hungerMax
    energyCurrent
    energyMax
    armorCurrent
    armorMax
    corporationID
    corporationRankID
    gangID
    gangRankID
    killDeathRatio
    killsTotal
    killsFistTotal
    killsMeleeTotal
    killsBombTotal
    killsGunTotal
    deathsTotal
    timesArrestedTotal
    arrestsTotal
    successfulEvasionsTotal
  }
`

export interface RPStatsFragment {
  userID: number;
  healthCurrent: number;
  healthMax: number;
  hungerCurrent: number;
  hungerMax: number;
  energyCurrent: number;
  energyMax: number;
  armorCurrent: number;
  armorMax: number;
  corporationID?: number;
  corporationRankID?: number;
  gangID?: number;
  gangRankID?: number;
  killDeathRatio: number;
  killsTotal: number;
  killsFistTotal: number;
  killsMeleeTotal: number;
  killsBombTotal: number;
  killsGunTotal: number;
  deathsTotal: number;
  timesArrestedTotal: number;
  arrestsTotal: number;
  successfulEvasionsTotal: number;
}