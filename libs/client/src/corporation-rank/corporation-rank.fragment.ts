import gql from "graphql-tag";

export const CORPORATION_RANK_FRAGMENT: any = gql`
  fragment CorporationRankFragment on CorporationRankModel {
    corporationID
    corporationRankID
    name
  }
`

export interface CorporationRankFragment {
  corporationID: number;
  corporationRankID: number;
  name: string;
}