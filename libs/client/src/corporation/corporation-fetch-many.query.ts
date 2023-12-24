import gql from "graphql-tag";
import { CORPORATION_FRAGMENT, CorporationFragment } from "./corporation.fragment";
import { CorporationFetchManyInput } from "./corporation.input";

export const CORPORATION_FETCH_MANY_QUERY: any = gql`
  ${CORPORATION_FRAGMENT}
  query($filter: CorporationFetchManyInput!) {
    corporations(filter: $filter) {
      ...CorporationFragment
    }
  }
`
export interface CorporationFetchManyQueryVariables {
  filter: CorporationFetchManyInput;
}

export interface CorporationFetchManyQueryResponse {
  corporations: CorporationFragment[];
}