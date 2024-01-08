import { websocketContext } from './WebsocketContext';
import { usersOnlineContext } from './UsersOnlineContext';
import React, { useContext, useEffect, useState } from 'react';
import { UsersOnlineContextProviderProps } from './UsersOnlineContext.types';

export function UsersOnlineContextProvider({ children }: UsersOnlineContextProviderProps) {
  const { client } = useContext(websocketContext);
  const [usersOnline, setUsersOnline] = useState(0);
  useEffect(() => {
    client.registerCallback('user_count', setUsersOnline)
  }, []);

  return (
    <usersOnlineContext.Provider value={{ usersOnline }}>
      {children}
    </usersOnlineContext.Provider>
  );
}
