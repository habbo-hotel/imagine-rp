import { Link } from 'wouter';
import { GameClientElement } from './GameClient.styled';
import React, { useContext, useEffect, useState } from 'react';
import { configContext, sessionContext, themeContext, useSSOCreate } from '@imagine-cms/web';
import { GameUI } from '@imagine-cms/game-ui';
import { NITRO_CLIENT_URL } from '../../site-ui.const';

export function GameClient() {
  const generateSSO = useSSOCreate();
  const { config } = useContext(configContext);
  const { session } = useContext(sessionContext);
  const { showClient } = useContext(themeContext);
  const [showPreview] = useState(true);

  console.log(NITRO_CLIENT_URL)

  useEffect(() => {
    generateSSO.runQuery();
  }, [session]);

  const ssoToken = generateSSO.data?.sessionSSOCreate?.ssoToken

  if (!session || !ssoToken) {
    return null;
  }

  return (
    <GameClientElement $visible={showClient} $preview={showPreview}>
      {showClient && <GameUI ssoTicket={ssoToken} />}
      {
        showPreview && !showClient && (
          <Link to="/play">
            <div className="content">
              <div className="preview-overlay">
                <i className="fa fa-search-location" style={{ marginRight: 8 }} />
                Showing Preview
              </div>
            </div>
          </Link>
        )
      }
      <iframe
        src={`${NITRO_CLIENT_URL ?? config.nitroURL}?sso=${ssoToken}`}
        style={{ height: '100%', width: '100%' }}
      />
    </GameClientElement>
  );
}
