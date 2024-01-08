import { UserWire, UserGender, UserOnlineStatus } from "@imagine-cms/types";

export const MOCK_USER: UserWire = {
  id: 0,
  username: 'Guest',
  email: '',
  credits: 0,
  vipPoints: 0,
  accountCreatedAt: 0,
  motto: 'Join or create an account today',
  rankID: -1,
  activityPoints: 0,
  look: '-',
  gender: UserGender.Male,
  onlineStatus: UserOnlineStatus.Offline,
  homeRoomID: -1,
}

// @ts-ignore
export const NITRO_CLIENT_URL = process.env.NEXT_NITRO_CLIENT_URL
