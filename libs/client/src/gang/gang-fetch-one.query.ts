import gql from "graphql-tag";
import { GANG_FRAGMENT, GangFragment } from "./gang.fragment";
import { GangFilterOneInput } from "./gang.input";

export const GANG_FETCH_ONE_QUERY: any = gql`
  ${GANG_FRAGMENT}
  query($filter: GangFilterOneInput!) {
    gang(filter: $filter) {
      ...GangFragment
    }
  }
`

export interface GangFetchOneQueryVariables {
  filter: GangFilterOneInput;
}

export interface GangFetchOneQueryResponse {
  gang: GangFragment;
}