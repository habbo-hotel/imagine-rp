import gql from 'graphql-tag';
import { USER_FRAGMENT, UserFragment } from '../rp-stats/user/user.fragment';

export const FRIENDSHIP_FRAGMENT: any = gql`
  ${USER_FRAGMENT}
  fragment FriendshipFragment on FriendshipModel {
    userID
    friendID
    friend {
      ...UserFragment
    }
  }
`

export interface FriendshipFragment {
  userID: number;
  friendID: number;
  friend: UserFragment;
}