import gql from "graphql-tag";
import { CORPORATION_MEMBER_FRAGMENT, CorporationMemberFragment } from "./corporation-member.fragment";
import { CorporationMemberFilterManyInput } from "./corporation-member.input";

export const CORPORATION_MEMBER_FETCH_MANY_QUERY: any = gql`
  ${CORPORATION_MEMBER_FRAGMENT}
  query($filter: CorporationMemberFilterManyInput!) {
    corporationMembers(filter: $filter) {
      ...CorporationMemberFragment
    }
  }
`
export interface CorporationMemberFilterManyQueryVariables {
  filter: CorporationMemberFilterManyInput;
}

export interface CorporationMemberFilterManyQueryResponse {
  corporationMembers: CorporationMemberFragment[];
}