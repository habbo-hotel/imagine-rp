import gql from "graphql-tag";
import { USER_FRAGMENT, UserFragment } from "../user/user.fragment";

export const CORPORATION_FRAGMENT: any = gql`
  ${USER_FRAGMENT}
  fragment CorporationFragment on CorporationModel {
    id
    name
    description
    badgeCode
    userID
    user {
      ...UserFragment
    }
  }
`

export interface CorporationFragment {
  id: number;
  name: string;
  description: string;
  badgeCode: string;
  userID: number;
  user: UserFragment;
}