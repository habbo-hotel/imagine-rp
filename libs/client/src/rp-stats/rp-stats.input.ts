export interface RPStatsFilterOneInput {
  userID: number;
}


export enum RPStatsOrderBy {
  killDeathRatio = 'killDeathRatio',
  killsTotal = 'killsTotal',
  killsFistTotal = 'killsFistTotal',
  killsMeleeTotal = 'killsMeleeTotal',
  killsBombTotal = 'killsBombTotal',
  killsGunTotal = 'killsGunTotal',
  deathsTotal = 'deathsTotal',
  timesArrestedTotal = 'timesArrestedTotal',
  arrestsTotal = 'arrestsTotal',
  successfulEvasionsTotal = 'successfulEvasionsTotal',
}
export interface RPStatsFilterManyInput {
  userIDs?: number[];
  skip?: number;
  limit?: number;
  orderBy?: RPStatsOrderBy;

}