import gql from "graphql-tag";
import { USER_FRAGMENT, UserFragment } from "../user/user.fragment";
import { GROUP_FRAGMENT, GroupFragment } from "../group/group.fragment";

export const GANG_FRAGMENT: any = gql`
  ${GROUP_FRAGMENT}
  fragment GangFragment on GangModel {
    groupID
    group {
      ...GroupFragment
    }
  }
`

export interface GangFragment {
  groupID: number;
  group: GroupFragment;
}