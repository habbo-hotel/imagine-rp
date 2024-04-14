'use client'
import Link from 'next/link'
import React, { useContext } from 'react';
import { SiteNav } from '../site-nav/SiteNav';
import { SiteLogo } from '../site-logo/SiteLogo';
import { usersOnlineContext } from '@imagine-cms/websocket';
import { ToggleThemeButton } from '../toggle-theme-button/ToggleThemeButton';
import { ButtonBrand, ButtonDanger, ButtonClear } from '../button/Button.remix';
import { GuestGuard, ScopeGuard, UserGuard, configContext } from '@imagine-cms/web';
import { SiteHeaderActions, SiteHeaderContent, SiteHeaderElement, SiteHeaderImage, SiteHeaderNav, SiteHeaderNavigation, SiteHeaderTools, SiteHeaderWrapper } from './SiteHeader.styled';

export function SiteHeader() {
  const { config } = useContext(configContext);
  const { usersOnline } = useContext(usersOnlineContext);
  return (
    <SiteHeaderWrapper>
      <SiteHeaderImage>
        <SiteHeaderContent>
          <Link href="/login">
            <SiteLogo />
          </Link>
          <SiteHeaderTools>
            <ScopeGuard scope="accessAdminPanel" redirect={false}>
              <Link href="/admin/dashboard">
                <ButtonDanger>
                  Admin Panel
                </ButtonDanger>
              </Link>
            </ScopeGuard>
            <Link href="/play">
              <ButtonClear>
                Enter {config!.siteName} - <b>{usersOnline}</b> users online
              </ButtonClear>
            </Link>
          </SiteHeaderTools>
        </SiteHeaderContent>
      </SiteHeaderImage>
      <SiteHeaderElement>
        <SiteHeaderContent>
          <SiteHeaderNavigation>
            <SiteHeaderNav>
              <SiteNav />
            </SiteHeaderNav>
          </SiteHeaderNavigation>
          <SiteHeaderActions>
            <ToggleThemeButton />
            <UserGuard>
              <Link href="/settings">
                <ButtonClear style={{ padding: 0, width: 100 }}>
                  <i className="fa fa-cog" /> Settings
                </ButtonClear>
              </Link>
              <Link href="/logout">
                <ButtonClear style={{ color: '#7C0F0F', padding: 0, width: 100 }}>
                  <i className="fa fa-sign-out" /> Sign Out
                </ButtonClear>
              </Link>
            </UserGuard>
            <GuestGuard redirect={false}>
              <Link href="/login">
                <ButtonBrand>
                  Login
                </ButtonBrand>
              </Link>
              <Link href="/register">
                <ButtonBrand>
                  Create Account
                </ButtonBrand>
              </Link>
            </GuestGuard>
          </SiteHeaderActions>
        </SiteHeaderContent>
      </SiteHeaderElement >
    </SiteHeaderWrapper>
  )
}
