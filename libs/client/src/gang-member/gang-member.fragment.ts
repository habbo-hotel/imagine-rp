import gql from "graphql-tag";

export const GANG_MEMBER_FRAGMENT: any = gql`
  fragment GangMemberFragment on GangMemberModel {
    gangID
    userID
  }
`

export interface GangMemberFragment {
  gangID: number;
  userID: number;
}