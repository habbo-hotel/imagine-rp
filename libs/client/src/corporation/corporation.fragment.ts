import gql from "graphql-tag";
import { GROUP_FRAGMENT, GroupFragment } from "../group/group.fragment";

export const CORPORATION_FRAGMENT: any = gql`
  ${GROUP_FRAGMENT}
  fragment CorporationFragment on CorporationModel {
    groupID
    tags
    group {
      ...GroupFragment
    }
  }
`

export interface CorporationFragment {
  groupID: number;
  tags: string;
  group: GroupFragment;
}