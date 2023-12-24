import gql from "graphql-tag";
import { GANG_FRAGMENT, GangFragment } from "./gang.fragment";
import { GangFetchManyInput } from "./gang.input";

export const GANG_FETCH_MANY_QUERY: any = gql`
  ${GANG_FRAGMENT}
  query($filter: GangFetchManyInput!) {
    corporations(filter: $filter) {
      ...GangFragment
    }
  }
`
export interface GangFetchManyQueryVariables {
  filter: GangFetchManyInput;
}

export interface GangFetchManyQueryResponse {
  corporations: GangFragment[];
}