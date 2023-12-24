import gql from "graphql-tag";
import { CORPORATION_FRAGMENT, CorporationFragment } from "./corporation.fragment";
import { CorporationFilterOneInput } from "./corporation.input";

export const CORPORATION_FETCH_ONE_QUERY: any = gql`
  ${CORPORATION_FRAGMENT}
  query($filter: CorporationFilterOneInput!) {
    corporation(filter: $filter) {
      ...CorporationFragment
    }
  }
`

export interface CorporationFilterOneQueryVariables {
  filter: CorporationFilterOneInput;
}

export interface CorporationFilterOneQueryResponse {
  corporation: CorporationFragment;
}