import gql from "graphql-tag";
import { USER_FRAGMENT, UserFragment } from "../rp-stats/user/user.fragment";

export const GANG_FRAGMENT: any = gql`
  ${USER_FRAGMENT}
  fragment GangFragment on GangModel {
    id
    name
    description
    userID
    user {
      ...UserFragment
    }
  }
`

export interface GangFragment {
  id: number;
  name: string;
  description: string;
  userID: number;
  user: UserFragment;
}