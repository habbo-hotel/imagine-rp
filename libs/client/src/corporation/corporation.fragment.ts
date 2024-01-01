import gql from "graphql-tag";
import { USER_FRAGMENT, UserFragment } from "../user/user.fragment";
import { ROOM_FRAGMENT, RoomFragment } from "../room/room.fragment";

export const CORPORATION_FRAGMENT: any = gql`
  ${USER_FRAGMENT}
  ${ROOM_FRAGMENT}
  fragment CorporationFragment on CorporationModel {
    id
    name
    description
    badgeCode
    userID
    user {
      ...UserFragment
    }
    roomID
    room {
      ...RoomFragment
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
  roomID: number;
  room: RoomFragment;
}