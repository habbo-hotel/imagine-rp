import gql from "graphql-tag";
import { GangRankFragment } from "./gang-rank.fragment";
import { GangRankFilterManyInput } from "./gang-rank.input";

export const GANG_RANK_FETCH_MANY_QUERY: any = gql`
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