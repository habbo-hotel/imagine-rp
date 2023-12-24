import React from 'react';
import { Link } from '../../blocks/link/Link';
import { SITE_URL, ScopeGuard, UserGuard } from '@imagine-cms/web';
import { SiteSidebarElement } from './SiteSidebar.styled';

export function SiteSidebar() {
  return (
    <SiteSidebarElement>
      <ul>
        <Link href="/dashboard">
          <li>
            <i className="fa fa-home" />
          </li>
        </Link>
        <ScopeGuard scope="manageBetaCodes" redirect={false}>
          <Link href="/beta-codes">
            <li>
              <i className="fa fa-vial" />
            </li>
          </Link>
        </ScopeGuard>
        <ScopeGuard scope="manageUsers" redirect={false}>
          <Link href="/users">
            <li>
              <i className="fa fa-users" />
            </li>
          </Link>
        </ScopeGuard>
        <ScopeGuard scope="manageRooms" redirect={false}>

          <Link href="/rooms">
            <li>
              <i className="fa fa-door-open" />
            </li>
          </Link>
        </ScopeGuard>
        <ScopeGuard scope="manageArticles" redirect={false}>
          <Link href="/articles">
            <li>
              <i className="fa fa-typewriter" />
            </li>
          </Link>
        </ScopeGuard>
        <ScopeGuard scope="managePermissions" redirect={false}>
          <Link href="/permissions">
            <li>
              <i className="fa fa-shield" />
            </li>
          </Link>
        </ScopeGuard>
        <ScopeGuard scope="manageSite" redirect={false}>
          <Link href="/configuration">
            <li>
              <i className="fa fa-cog" />
            </li>
          </Link>
        </ScopeGuard>
      </ul>
      <footer>
        <ul>
          <UserGuard redirect={false}>
            <Link href="/logout">
              <li>
                <i className="fa fa-sign-out" style={{ color: 'red' }} />
              </li>
            </Link>
          </UserGuard>
          <a href={SITE_URL}>
            <li>
              <i className="fa fa-external-link" />
            </li>
          </a>
        </ul>
        <div className="notranslate">
          <b>Cerberus</b>
          <div>
            by&nbsp;<b>LeChris</b>
          </div>
        </div>
      </footer>
    </SiteSidebarElement>
  )
}