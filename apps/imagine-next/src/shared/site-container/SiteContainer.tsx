'use client';
import React, { useMemo } from 'react';
import { SiteContainerProps } from './SiteContainer.types';
import { usePathname } from 'next/navigation';
import { AdminContainer } from '../../admin-ui/components/admin-container/AdminContainer';
import { SiteContainer as PrimarySiteContainer } from '../../site-ui/components/site-container/SiteContainer';
import { SiteLogo } from '../../site-ui/components/site-logo/SiteLogo';

export function SiteContainer({ children }: SiteContainerProps) {
  const pathname = usePathname();
  const Container = useMemo(() => {
    const isAdminPath = pathname.includes('admin');
    return isAdminPath ? AdminContainer : PrimarySiteContainer;
  }, [pathname]);
  return (
    <Container>
      <SiteLogo />
      {children}
    </Container>
  )
}