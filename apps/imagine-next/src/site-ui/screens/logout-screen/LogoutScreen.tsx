'use client'
import React, { useContext, useEffect } from 'react';
import { sessionContext, localStorageService, graphQLContext } from '@imagine-cms/web';
import { redirect } from 'next/navigation';

export function LogoutScreen() {
  const { _setSession } = useContext(sessionContext);
  const { refreshClient } = useContext(graphQLContext);

  useEffect(() => {
    localStorageService.purge();
    _setSession(undefined);
    refreshClient();
  }, []);

  return redirect('/login')
}
