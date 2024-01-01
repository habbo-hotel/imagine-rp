import gql from 'graphql-tag';
import { RPStatsFilterManyInput } from './rp-stats.input';
import { RPStatsFragment, RP_STATS_FRAGMENT } from './rp-stats.fragment';

export const RP_STATS_FETCH_MANY_QUERY: any = gql`
  ${RP_STATS_FRAGMENT}
  query($filter: RPStatsFilterManyInput!) {
    rpStats(filter: $filter) {
      ...RPStatsFragment
    }
  }
`

export interface RPStatsFetchManyQueryVariables {
  filter: RPStatsFilterManyInput;
}
export interface RPStatsFetchManyQueryResponse {
  rooms: RPStatsFragment[];
}