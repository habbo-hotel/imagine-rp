'use client'
import React from 'react';
import { GuestGuard, UserGuard } from '@imagine-cms/web';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function SiteNav() {
  const pathname = usePathname();
  return (
    <>
      <GuestGuard>
        <li>
          <Link href="/login">
            <i className="fa fa-home" style={{ marginRight: 8 }} />
            Login
          </Link>
        </li>
      </GuestGuard>
      <UserGuard>
        <li className={pathname === '/me' ? 'active' : ''}>
          <Link href="/me">
            <i className="fa fa-home" style={{ marginRight: 8 }} />
            Home
          </Link>
        </li>
      </UserGuard>
      <li className={pathname.indexOf('community') > -1 ? 'active' : ''}>
        <Link href="/community">
          <i className="fa fa-users" style={{ marginRight: 8 }} />
          Community
        </Link>
      </li>
      <li className={pathname.indexOf('ranks') > -1 ? 'active' : ''}>
        <Link href="/ranks">
          <i className="fa fa-shield" style={{ marginRight: 8 }} />
          Staff
        </Link>
      </li>
      <li className={pathname.indexOf('high-scores') > -1 ? 'active' : ''}>
        <Link href="/high-scores/roleplay">
          <i className="fa fa-trophy" style={{ marginRight: 8 }} />
          High Scores
        </Link>
      </li>
      <li className={pathname.indexOf('corps') > -1 ? 'active' : ''}>
        <Link href="/corps">
          <i className="fa fa-building" style={{ marginRight: 8 }} />
          Corporations
        </Link>
      </li>
      <li className={pathname.indexOf('gangs') > -1 ? 'active' : ''}>
        <Link href="/gangs">
          <i className="fa fa-cannabis" style={{ marginRight: 8 }} />
          Gangs
        </Link>
      </li>
    </>
  )
}