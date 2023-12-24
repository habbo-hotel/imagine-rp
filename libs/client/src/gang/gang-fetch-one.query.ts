import gql from "graphql-tag";
import { GANG_FRAGMENT, GangFragment } from "./gang.fragment";
import { GangFetchOneInput } from "./gang.input";

export const GANG_FETCH_ONE_QUERY: any = gql`
  ${GANG_FRAGMENT}
  query($filter: GangFetchOneInput!) {
    Gang(filter: $filter) {
      ...GangFragment
    }
  }
`

export interface GangFetchOneQueryVariables {
  filter: GangFetchOneInput;
}

export interface GangFetchOneQueryResponse {
  Gang: GangFragment;
}