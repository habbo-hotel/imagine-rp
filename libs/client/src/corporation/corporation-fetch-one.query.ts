import gql from "graphql-tag";
import { CORPORATION_FRAGMENT, CorporationFragment } from "./corporation.fragment";
import { CorporationFetchOneInput } from "./corporation.input";

export const CORPORATION_FETCH_ONE_QUERY: any = gql`
  ${CORPORATION_FRAGMENT}
  query($filter: CorporationFetchOneInput!) {
    corporation(filter: $filter) {
      ...CorporationFragment
    }
  }
`

export interface CorporationFetchOneQueryVariables {
  filter: CorporationFetchOneInput;
}

export interface CorporationFetchOneQueryResponse {
  corporation: CorporationFragment;
}