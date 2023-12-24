import gql from "graphql-tag";
import { CORPORATION_FRAGMENT, CorporationFragment } from "./corporation.fragment";
import { CorporationFilterManyInput } from "./corporation.input";

export const CORPORATION_FETCH_MANY_QUERY: any = gql`
  ${CORPORATION_FRAGMENT}
  query($filter: CorporationFilterManyInput!) {
    corporations(filter: $filter) {
      ...CorporationFragment
    }
  }
`
export interface CorporationFilterManyQueryVariables {
  filter: CorporationFilterManyInput;
}

export interface CorporationFilterManyQueryResponse {
  corporations: CorporationFragment[];
}