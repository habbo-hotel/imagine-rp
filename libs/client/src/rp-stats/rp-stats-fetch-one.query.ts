import gql from "graphql-tag";
import { RPStatsFragment, RP_STATS_FRAGMENT } from "./rp-stats.fragment";
import { RPStatsFilterOneInput } from "./rp-stats.input";

export const RP_STATS_FETCH_ONE_QUERY: any = gql`
  ${RP_STATS_FRAGMENT}
  query($filter: RPStatsFilterOneInput!) {
    rpStat(filter: $filter) {
      ...RPStatsFragment
    }
  }
`

export interface RPStatsFetchOneQueryVariables {
  filter: RPStatsFilterOneInput;
}

export interface RPStatsFetchOneQueryResponse {
  rpStat: RPStatsFragment;
}