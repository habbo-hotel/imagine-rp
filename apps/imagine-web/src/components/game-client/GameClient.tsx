import { Link } from 'wouter';
import { GameClientElement } from './GameClient.styled';
import React, { useContext, useEffect, useState } from 'react';
import { GameClientActions } from './game-client-actions/GameClientActions';
import { configContext, sessionContext, themeContext, useSSOCreate } from '@imagine-cms/web';

export function GameClient() {
  const generateSSO = useSSOCreate();
  const { config } = useContext(configContext);
  const { session } = useContext(sessionContext);
  const { showClient } = useContext(themeContext);
  const [showPreview, setShowPreview] = useState(true);

  const togglePreview = () => setShowPreview(_ => !_);

  useEffect(() => {
    generateSSO.runQuery();
  }, [session]);

  useEffect(() => {
    // @ts-ignore
    window.bobbarp = {
      ssoTicket: generateSSO.data?.sessionSSOCreate,
      userId: session?.id,
      users: 0,
      connection: {
        host: 'wss://ws.bobba.ca,2053',
        port: 'wss://ws.bobba.ca,2053'
      },
    }

    const [manifestSrc, vendorSrc, appSrc] = [
      document.createElement('script'),
      document.createElement('script'),
      document.createElement('script'),
    ]
    manifestSrc.src = 'https://cdn.bobba.ca/static/js/manifest.57b78255a267af8ab717.js';
    vendorSrc.src = 'https://cdn.bobba.ca/static/js/vendor.2f899352b481176a73b3.js';
    appSrc.src = 'https://cdn.bobba.ca/static/js/app.d4092cf942819e5cb5ab.js';

    document.body.appendChild(manifestSrc);
    document.body.appendChild(vendorSrc);
    document.body.appendChild(appSrc);

    return () => {
      document.body.removeChild(manifestSrc);
      document.body.removeChild(vendorSrc);
      document.body.removeChild(appSrc);
    }
  }, []);

  const ssoToken = generateSSO.data?.sessionSSOCreate?.ssoToken

  if (!session || !ssoToken) {
    return null;
  }

  return (
    <GameClientElement $visible={showClient} $preview={showPreview}>
      {
        showClient && (
          <>
            <GameClientActions />
          </>
        )
      }

      {
        showPreview && !showClient && (
          <div className="content">
            <Link to="/play">
              <div className="preview-overlay">
                <i className="fa fa-search-location" style={{ marginRight: 8 }} />
                Showing Preview
              </div>
            </Link>
          </div>
        )
      }
      <iframe
        src={`${config!.nitroURL}?sso=${ssoToken}`}
        style={{ height: '100%', width: '100%' }}
      />
    </GameClientElement>
  );
}
