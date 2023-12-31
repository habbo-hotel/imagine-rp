import gql from "graphql-tag";
import { GANG_RANK_FRAGMENT, GangRankFragment } from "./gang-rank.fragment";
import { GangRankFilterManyInput } from "./gang-rank.input";

export const GANG_RANK_FETCH_MANY_QUERY: any = gql`
  ${GANG_RANK_FRAGMENT}
  query($filter: GangRankFilterManyInput!) {
    gangRanks(filter: $filter) {
      ...GangRankFragment
    }
  }
`
export interface GangRankFilterManyQueryVariables {
  filter: GangRankFilterManyInput;
}

export interface GangRankFilterManyQueryResponse {
  gangRanks: GangRankFragment[];
}