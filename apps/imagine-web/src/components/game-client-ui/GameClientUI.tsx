import React, { useContext, useEffect } from 'react';
import { websocketContext } from '@imagine-cms/websocket';



export function GameClientUI() {
  const { on } = useContext(websocketContext);

  useEffect(() => {
    on('test', () => alert('test'));
  }, []);

  return (
    <>
      game client ui is here
    </>
  );
}
