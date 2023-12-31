import gql from "graphql-tag";
import { GangMemberFragment } from "./gang-member.fragment";
import { GangMemberFilterManyInput } from "./gang-member.input";

export const GANG_MEMBER_FETCH_MANY_QUERY: any = gql`
  query($filter: GangMemberFilterManyInput!) {
    gangMembers(filter: $filter) {
      ...GangMemberFragment
    }
  }
`
export interface GangMemberFilterManyQueryVariables {
  filter: GangMemberFilterManyInput;
}

export interface GangMemberFilterManyQueryResponse {
  gangMembers: GangMemberFragment[];
}