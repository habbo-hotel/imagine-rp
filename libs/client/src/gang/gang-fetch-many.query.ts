import gql from "graphql-tag";
import { GANG_FRAGMENT, GangFragment } from "./gang.fragment";
import { GangFilterManyInput } from "./gang.input";

export const GANG_FETCH_MANY_QUERY: any = gql`
  ${GANG_FRAGMENT}
  query($filter: GangFilterManyInput!) {
    gangs(filter: $filter) {
      ...GangFragment
    }
  }
`
export interface GangFetchManyQueryVariables {
  filter: GangFilterManyInput;
}

export interface GangFetchManyQueryResponse {
  gangs: GangFragment[];
}