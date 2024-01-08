import { useLocation } from 'wouter';
import { Avatar } from '@imagine-cms/shared-ui';
import React, { useContext, useEffect, useState } from 'react';
import { GameClientActionsElement } from './GameClientActions.styled';
import { usersOnlineContext, websocketContext } from '@imagine-cms/websocket';
import { ScopeGuard, configContext, sessionContext, themeContext } from '@imagine-cms/web';

export function GameClientActions() {
  const [, setLocation] = useLocation();
  const { config } = useContext(configContext);
  const { session } = useContext(sessionContext);
  const { setTheme } = useContext(themeContext);
  const { client } = useContext(websocketContext);
  const { usersOnline } = useContext(usersOnlineContext);
  const [serverTime, setServerTime] = useState('0:00pm');
  const [isExpanded, setExpanded] = useState<boolean>(false);

  async function onServerTimeReceived(serverTime: any) {
    console.log('GameClientActions onServerTimeReceived: ', serverTime)
    setServerTime(serverTime.toLowerCase());
  }

  useEffect(() => {
    client.registerCallback('server_time', onServerTimeReceived)
  }, []);


  function onViewProfile(): void {
    setTheme({ showClient: false });
    setLocation(session ? `/profile/${session.username}` : '/login');
  }

  function onReloadClient(): void {
    window.location.reload();
  }

  function onViewCommunity(): void {
    setTheme({ showClient: false });
    setLocation('/community');
  }

  function onViewAdminPanel(): void {
    setTheme({ showClient: false });
    setLocation('/admin/dashboard');
  }

  async function onToggleFullScreen(): Promise<void> {
    const action: Promise<void> = isExpanded
      ? document.exitFullscreen()
      : document.body.requestFullscreen();

    await action;
    setExpanded(!isExpanded);
  }

  return (
    <>
      <GameClientActionsElement>
        <button className="action" onClick={onViewProfile} style={{ maxWidth: 200, overflow: 'hidden' }}>
          <Avatar look={session?.look ?? '-'} headOnly={true} style={{ height: 35 }} />
          {session?.username ?? config.siteName}
        </button>
        <ScopeGuard redirect={false} scope="accessAdminPanel">
          <button className="action" style={{ marginRight: 4 }} onClick={onViewAdminPanel}>
            <i className="fa fa-shield" /> Admin
          </button>
        </ScopeGuard>
        <button className="action" onClick={onToggleFullScreen}>
          <i className={`fas ${isExpanded ? 'fa-compress' : 'fa-expand'}`} />
        </button>
        <button className="action" onClick={onReloadClient}>
          <i className="fas fa-sync" />
        </button>
        <button className="action" onClick={onViewCommunity}>
          <i className="fas fa-users" style={{ marginRight: 4 }} />
          {usersOnline}
        </button>
        <div className="action" style={{ fontWeight: 400 }}>
          <i className="fas fa-clock" style={{ marginRight: 4 }} />
          {serverTime}
        </div>
      </GameClientActionsElement>
    </>
  );
}
