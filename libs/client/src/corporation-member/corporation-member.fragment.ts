import gql from "graphql-tag";

export const CORPORATION_MEMBER_FRAGMENT: any = gql`
  fragment CorporationMemberFragment on CorporationMemberModel {
    corporationID
    corporationRankID
    userID
  }
`

export interface CorporationMemberFragment {
  corporationID: number;
  corporationRankID: number;
  userID: number;
}