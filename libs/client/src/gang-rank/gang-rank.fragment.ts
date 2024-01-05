import gql from "graphql-tag";

export const GANG_RANK_FRAGMENT: any = gql`
  fragment GangRankFragment on GangRankModel {
    gangID
    gangRankID
    name
  }
`

export interface GangRankFragment {
  gangID: number;
  gangRankID: number;
  name: string;
}