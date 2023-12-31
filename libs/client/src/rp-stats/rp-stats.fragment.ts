import gql from "graphql-tag";

export const RP_STATS_FRAGMENT: any = gql`
  fragment RPStatsFragment on RPStatsModel {
    userID
    health
    hunger
    energy
    armor
  }
`

export interface RPStatsFragment {
  userID: number;
  health: number;
  hunger: number;
  energy: number;
  armor: number;
}