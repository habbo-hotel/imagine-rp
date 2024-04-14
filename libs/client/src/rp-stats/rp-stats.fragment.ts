import gql from "graphql-tag";
export const RP_STATS_FRAGMENT: any = gql`
  fragment RPStatsFragment on RPStatsModel {
    userID
    healthCurrent
    healthMax
    corporationID
    corporationRankID
    gangID
  }
`

export interface RPStatsFragment {
  userID: number;
  healthCurrent: number;
  healthMax: number;
  corporationID?: number;
  corporationPositionID?: number;
  gangID?: number;
  gangPositionID?: number;
}