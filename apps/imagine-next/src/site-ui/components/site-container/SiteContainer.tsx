'use client'
import React, { useContext } from 'react';
import { themeContext } from '@imagine-cms/web';
import { SiteHeader } from '../site-header/SiteHeader';
import { SiteFooter } from '../site-footer/SiteFooter';
import { SiteContainerProps } from './SiteContainer.types';
import { SiteMobileHeader } from '../site-mobile-header/SiteMobileHeader';
import { PageContainerElement, SiteContainerElement } from './SiteContainer.styled';

export function SiteContainer({ children }: SiteContainerProps) {
  const { showClient } = useContext(themeContext);

  return (
    <>
      <SiteContainerElement>
        {
          !showClient && (
            <>
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