import React from 'react';
import { ToastContainer } from 'react-toastify';
import { SiteSidebar } from '../site-sidebar/SiteSidebar';
import { AdminContainerProps } from './AdminContainer.types';
import { PageContainerElement, SiteContainerElement } from '../../AdminUI.styled';
import { ChangeLanguageButton } from '../change-language-button/ChangeLanguageButton';

export function AdminContainer({ children }: AdminContainerProps) {
  return (
    <SiteContainerElement>
      <ToastContainer />
      <SiteSidebar />
      <PageContainerElement>
        <ChangeLanguageButton />
        {children}
      </PageContainerElement>
    </SiteContainerElement>
  )
}