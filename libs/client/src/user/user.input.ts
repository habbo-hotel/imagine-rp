
export enum UserOrderBy {
  ID_DESC = 'ID_DESC',
  CREDITS_ASC = 'CREDITS_ASC',
  PIXELS_ASC = 'PIXELS_ASC',
  POINTS_ASC = 'POINTS_ASC',
}
export interface UserFilterManyInput {
  ids?: number[];
  usernames?: number[];
  online?: boolean;
  ipLast?: string[];
  ipRegistered?: string[];
  machineAddress?: string[];
  orderBy?: UserOrderBy[];
  rankIDs?: number[];
  skip?: number;
  limit?: number;
}

export interface UserFilterOneInput {
  id?: number;
  username?: string;
}


export enum UserGender {
  Male = 'M',
  Female = 'F',
}


export interface UserCreateInput {
  username: string;
  password: string;
  email: string;
  betaCode?: string;
  gender?: UserGender;
  look?: string;
}