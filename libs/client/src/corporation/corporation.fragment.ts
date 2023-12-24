import gql from "graphql-tag";

export const CORPORATION_FRAGMENT: any = gql`
  fragment CorporationFragment on CorporationModel {
    id
    name
    description
    badgeCode
  }
`

export interface CorporationFragment {
  id: number;
  name: string;
  description: string;
  badgeCode: string;
}