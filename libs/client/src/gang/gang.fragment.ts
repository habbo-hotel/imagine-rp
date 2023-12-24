import gql from "graphql-tag";

export const GANG_FRAGMENT: any = gql`
  fragment GangFragment on GangModel {
    id
    name
    description
  }
`

export interface GangFragment {
  id: number;
  name: string;
  description: string;
}