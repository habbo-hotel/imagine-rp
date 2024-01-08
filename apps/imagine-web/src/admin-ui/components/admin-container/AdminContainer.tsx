import React from 'react';
import { SiteSidebar } from '../site-sidebar/SiteSidebar';
import { AdminContainerProps } from './AdminContainer.types';
import { PageContainerElement, SiteContainerElement } from '../../AdminUI.styled';
import { ChangeLanguageButton } from '../change-language-button/ChangeLanguageButton';

export function AdminContainer({ children }: AdminContainerProps) {
  return (
    <SiteContainerElement>
      <SiteSidebar />
      <PageContainerElement>
        <ChangeLanguageButton />
        {children}
      </PageContainerElement>
    </SiteContainerElement>
  )
}