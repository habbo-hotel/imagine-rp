export interface RPStatsFilterOneInput {
  userID: number;
}


export enum RPStatsOrderBy {
  KILLS_TOTAL = 'killsTotal',
  KILLS_FIST_TOTAL = 'killsFistTotal',
  KILLS_MELEE_TOTAL = 'killsMeleeTotal',
  KILLS_BOMB_TOTAL = 'killsBombTotal',
  KILLS_GUNG_TOTAL = 'killsGunTotal',
  DEATHS_TOTAL = 'deathsTotal',
  TIMES_ARRESTED_TOTAL = 'timesArrestedTotal',
  ARRESTS_TOTAL = 'arrestsTotal',
  SUCCESSFUL_EVASIONS_TOTAL = 'successfulEvasionsTotal'
}

export interface RPStatsFilterManyInput {
  userIDs?: number[];
  skip?: number;
  limit?: number;
  orderBy?: RPStatsOrderBy;

}