import gql from "graphql-tag";

export const GANG_MEMBER_FRAGMENT: any = gql`
  fragment GangMemberFragment on GangMemberModel {
    gangID
    gangRankID
    userID
  }
`

export interface GangMemberFragment {
  gangID: number;
  gangRankID: number;
  userID: number;
}