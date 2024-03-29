'use client'
import { toast } from 'react-toastify';
import { Card } from '../../components/card/Card';
import React, { useContext, useEffect, useMemo } from 'react';
import { LoadingMessage } from '../../components/loading-message/LoadingMessage';
import { useDiscordUserAuthenticate, useUserFetchOne } from '@imagine-cms/client';
import { graphQLContext, localStorageService, sessionContext } from '@imagine-cms/web';
import { redirect } from 'next/navigation';

export function LoginWithDiscordScreen() {
  const { _setSession } = useContext(sessionContext);
  const discordUserAuthenticate = useDiscordUserAuthenticate();
  const fetchUser = useUserFetchOne();
  const { refreshClient } = useContext(graphQLContext);

  const discordAuthCode = useMemo(() => {
    return window.location.hash.split('&access_token=')?.[1]?.split('&expires_in')?.[0]
  }, []);

  const onAttemptDiscordAuthentication = async (authCode: string) => {
    try {
      const session = await discordUserAuthenticate.execute({ discordAuthToken: authCode });
      localStorageService.set('SESSION', session.sessionToken);
      refreshClient();
      const matchingUser = await fetchUser.fetch({ id: session.userID })
      _setSession(matchingUser as any);
      redirect('/me');
    } catch (e: any) {
      toast.error('There was a problem logging in');
    }
  }

  useEffect(() => {
    if (!discordAuthCode) {
      return;
    }
    if (discordUserAuthenticate.loading) {
      return;
    }
    onAttemptDiscordAuthentication(discordAuthCode);
  }, [discordAuthCode]);

  return (
    <Card header="Discord Login">
      <LoadingMessage>
        Logging in via Discord
      </LoadingMessage>
    </Card>
  )
}