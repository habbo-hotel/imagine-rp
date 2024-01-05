import React from 'react';
import { Link, useLocation } from 'wouter';
import { GuestGuard, UserGuard } from '@imagine-cms/web';

export function SiteNav() {
  const [path] = useLocation();
  return (
    <>
      <GuestGuard>
        <li>
          <Link to="/login">
            <i className="fa fa-home" style={{ marginRight: 8 }} />
            Login
          </Link>
        </li>
      </GuestGuard>
      <UserGuard>
        <li className={path === '/me' ? 'active' : ''}>
          <Link to="/me">
            <i className="fa fa-home" style={{ marginRight: 8 }} />
            Home
          </Link>
        </li>
      </UserGuard>
      <li className={path.indexOf('community') > -1 ? 'active' : ''}>
        <Link to="/community">
          <i className="fa fa-users" style={{ marginRight: 8 }} />
          Community
        </Link>
      </li>
      <li className={path.indexOf('ranks') > -1 ? 'active' : ''}>
        <Link to="/ranks">
          <i className="fa fa-shield" style={{ marginRight: 8 }} />
          Staff
        </Link>
      </li>
      <li className={path.indexOf('high-scores') > -1 ? 'active' : ''}>
        <Link to="/high-scores/roleplay">
          <i className="fa fa-trophy" style={{ marginRight: 8 }} />
          High Scores
        </Link>
      </li>
      <li className={path.indexOf('corps') > -1 ? 'active' : ''}>
        <Link to="/corps">
          <i className="fa fa-building" style={{ marginRight: 8 }} />
          Corporations
        </Link>
      </li>
      <li className={path.indexOf('gangs') > -1 ? 'active' : ''}>
        <Link to="/gangs">
          <i className="fa fa-cannabis" style={{ marginRight: 8 }} />
          Gangs
        </Link>
      </li>
    </>
  )
}