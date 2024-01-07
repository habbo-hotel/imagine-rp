import { useLocation } from 'wouter';
import { themeContext } from '@imagine-cms/web';
import React, { useContext, useEffect, useState } from 'react';
import { GameClientActionsElement } from './GameClientActions.styled';
import { websocketContext } from '@imagine-cms/websocket';

export function GameClientActions() {
  const [, setLocation] = useLocation();
  const { setTheme } = useContext(themeContext);
  const { client } = useContext(websocketContext);
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const [serverTime, setServerTime] = useState('0:00pm');
  const [userCount, setUserCount] = useState(0);

  async function onServerTimeReceived(serverTime: any) {
    console.log('GameClientActions onServerTimeReceived: ', serverTime)
    setServerTime(serverTime.toLowerCase());
  }

  async function onUserCountReceived(userCount: any) {
    console.log('GameClientActions onUserCountReceived:', userCount)
    setUserCount(userCount);
  }

  useEffect(() => {
    client.registerCallback('user_count', onServerTimeReceived)
    client.registerCallback('server_time', onServerTimeReceived)
  }, []);


  function onViewHome(): void {
    setTheme({ showClient: false });
    setLocation('/me');
  }

  function onReloadClient(): void {
    window.location.reload();
  }

  function onViewCommunity(): void {
    setTheme({ showClient: false });
    setLocation('/community');
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
        <button className="action" onClick={onViewHome}>Web</button>
        <button className="action" onClick={onToggleFullScreen}>
          <i className={`fas ${isExpanded ? 'fa-compress' : 'fa-expand'}`} />
        </button>
        <button className="action" onClick={onReloadClient}>
          <i className="fas fa-sync" />
        </button>
        <button className="action" onClick={onViewCommunity}>
          <i className="fas fa-users" style={{ marginRight: 4 }} />
          {userCount}
        </button>
        <div className="action" style={{ fontWeight: 400 }}>
          <i className="fas fa-clock" style={{ marginRight: 4 }} />
          {serverTime}
        </div>
      </GameClientActionsElement>
    </>
  );
}
