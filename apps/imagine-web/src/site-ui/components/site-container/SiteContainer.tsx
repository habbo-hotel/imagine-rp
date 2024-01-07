import React, { useContext } from 'react';
import { themeContext } from '@imagine-cms/web';
import { ToastContainer } from 'react-toastify';
import { GameClient } from '../game-client/GameClient';
import { SiteHeader } from '../site-header/SiteHeader';
import { SiteFooter } from '../site-footer/SiteFooter';
import { SiteBody } from '../site-body/SiteBody.styled';
import { SiteContainerProps } from './SiteContainer.types';
import { SiteMobileHeader } from '../site-mobile-header/SiteMobileHeader';
import { PageContainerElement, SiteContainerElement } from './SiteContainer.styled';

export function SiteContainer({ children }: SiteContainerProps) {
  const { showClient } = useContext(themeContext);

  return (
    <>
      <SiteBody />
      <SiteContainerElement>
        <GameClient />
        <ToastContainer />
        {
          !showClient && (
            <>
              <SiteHeader />
              <SiteMobileHeader />
              <PageContainerElement>
                {children}
              </PageContainerElement>
              <SiteFooter />
            </>
          )
        }
      </SiteContainerElement>
    </>
  )
}