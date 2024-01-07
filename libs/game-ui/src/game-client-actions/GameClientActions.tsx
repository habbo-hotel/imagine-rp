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

  async function onServerTimeReceived(serverTime: any) {
    console.log('GameInfoBar: ', serverTime)
    setServerTime(serverTime);
  }

  useEffect(() => {
    client.registerCallback('server_time', onServerTimeReceived)
  }, []);


  function toggleWebView(): void {
    setTheme({ showClient: false });
    setLocation('/me');
  }

  async function toggleFullScreen(): Promise<void> {
    const action: Promise<void> = isExpanded
      ? document.exitFullscreen()
      : document.body.requestFullscreen();

    await action;
    setExpanded(!isExpanded);
  }

  function reloadPage(): void {
    window.location.reload();
  }

  return (
    <>
      <GameClientActionsElement>
        <button className="action" onClick={toggleWebView}>Web</button>
        <button className="action" onClick={toggleFullScreen}>
          <i className={`fas ${isExpanded ? 'fa-compress' : 'fa-expand'}`} />
        </button>
        <button className="action" onClick={reloadPage}>
          <i className="fas fa-sync" />
        </button>
        <div className="action" style={{ fontWeight: 400 }}>
          <i className="fas fa-clock" style={{ marginRight: 4 }} />
          {serverTime}
        </div>
      </GameClientActionsElement>
    </>
  );
}
