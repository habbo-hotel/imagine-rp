import React, { useContext, useEffect, useState } from 'react';
import { websocketContext } from '../../../websocket/src';

export function GameInfoBar() {
  const { client } = useContext(websocketContext);
  const [serverTime, setServerTime] = useState('0:00pm');

  async function onServerTimeReceived(serverTime: any) {
    console.log('GameInfoBar: ', serverTime)
    setServerTime(serverTime);
  }

  useEffect(() => {
    client.registerCallback('server_time', onServerTimeReceived)
  }, []);


  return (
    <div>
      {serverTime}
    </div>
  )
}