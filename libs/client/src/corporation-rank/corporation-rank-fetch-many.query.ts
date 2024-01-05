import gql from "graphql-tag";
import { CORPORATION_RANK_FRAGMENT, CorporationRankFragment } from "./corporation-rank.fragment";
import { CorporationRankFilterManyInput } from "./corporation-rank.input";

export const CORPORATION_RANK_FETCH_MANY_QUERY: any = gql`
  ${CORPORATION_RANK_FRAGMENT}
  query($filter: CorporationRankFilterManyInput!) {
    corporationRanks(filter: $filter) {
      ...CorporationRankFragment
    }
  }
`
export interface CorporationRankFilterManyQueryVariables {
  filter: CorporationRankFilterManyInput;
}

export interface CorporationRankFilterManyQueryResponse {
  corporationRanks: CorporationRankFragment[];
}