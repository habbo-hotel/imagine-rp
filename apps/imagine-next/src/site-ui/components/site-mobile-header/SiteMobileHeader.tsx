'use client'
import Link from 'next/link';
import { SiteNav } from '../site-nav/SiteNav';
import { GridLarge } from '../grid/Grid.remix';
import { SiteLogo } from '../site-logo/SiteLogo';
import React, { useEffect, useState } from 'react';
import { SiteMobileHeaderElement } from './SiteMobileHeader.styled';
import { GuestGuard, ScopeGuard, UserGuard } from '@imagine-cms/web';
import { ButtonDanger, ButtonClear, ButtonBrand } from '../button/Button.remix';
import { usePathname } from 'next/navigation';

export function SiteMobileHeader() {
  const pathname = usePathname();
  const [showOnMobile, setShowOnMobile] = useState(false);

  const toggleMobile = () => {
    setShowOnMobile(_ => !_);
  }

  useEffect(() => {
    if (showOnMobile) {
      setShowOnMobile(false);
    }
  }, [pathname]);

  return (
    <SiteMobileHeaderElement>
      <ul>
        <li onClick={toggleMobile}>
          <SiteLogo />
        </li>
        {
          showOnMobile && (
            <>
              <SiteNav />
              <GridLarge style={{ marginTop: 16 }}>
                <UserGuard>
                  <Link href="/settings">
                    <ButtonClear>
                      <i className="fa fa-wrench" style={{ marginRight: 8 }} />
                      Settings
                    </ButtonClear>
                  </Link>
                </UserGuard>
                <ScopeGuard scope="accessAdminPanel" redirect={false}>
                  <Link href="/admin/dashboard" style={{ width: '100%' }}>
                    <ButtonDanger style={{ width: '100%' }}>
                      <i className="fa fa-cog" style={{ marginRight: 8 }} />
                      Admin
                    </ButtonDanger>
                  </Link>
                </ScopeGuard>
                <UserGuard>
                  <Link href="/play">
                    <ButtonBrand>
                      <i className="fa fa-users" style={{ marginRight: 8 }} />
                      Play
                    </ButtonBrand>
                  </Link>
                </UserGuard>
              </GridLarge>
              <GuestGuard redirect={false}>
                <GridLarge style={{ marginTop: 16 }}>
                  <Link href="/login">
                    <ButtonBrand>
                      Login
                    </ButtonBrand>
                  </Link>
                  <Link href="/register">
                    <ButtonDanger>
                      Create Account
                    </ButtonDanger>
                  </Link>
                </GridLarge>
              </GuestGuard>
            </>
          )
        }
      </ul>
    </SiteMobileHeaderElement >
  )
}