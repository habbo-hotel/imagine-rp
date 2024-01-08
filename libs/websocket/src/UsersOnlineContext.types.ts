import { ReactNode } from 'react';

export interface UsersOnlineContext {
  usersOnline: number;
}

export const defaultUsersOnlineContext: UsersOnlineContext = {
  usersOnline: 0,
};

export interface UsersOnlineContextProviderProps {
  children: ReactNode;
}
