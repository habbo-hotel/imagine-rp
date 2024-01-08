import React, { createContext } from 'react';
import { UsersOnlineContext, defaultUsersOnlineContext } from './UsersOnlineContext.types';

export const usersOnlineContext = createContext<UsersOnlineContext>(
  defaultUsersOnlineContext
);
