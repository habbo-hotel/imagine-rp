import React from 'react';
import { Link } from '../../blocks/link/Link';
import { SITE_URL, ScopeGuard, UserGuard } from '@imagine-cms/web';
import { SiteSidebarElement } from './SiteSidebar.styled';

export function SiteSidebar() {
  return (
    <SiteSidebarElement>
      <ul>
        <Link href="/admin/dashboard">
          <li>
            <i className="fa fa-home" />
          </li>
        </Link>
        <ScopeGuard scope="manageBetaCodes" redirect={false}>
          <Link href="/admin/beta-codes">
            <li>
              <i className="fa fa-vial" />
            </li>
          </Link>
        </ScopeGuard>
        <ScopeGuard scope="manageUsers" redirect={false}>
          <Link href="/admin/users">
            <li>
              <i className="fa fa-users" />
            </li>
          </Link>
        </ScopeGuard>
        <ScopeGuard scope="manageRooms" redirect={false}>

          <Link href="/admin/rooms">
            <li>
              <i className="fa fa-door-open" />
            </li>
          </Link>
        </ScopeGuard>
        <ScopeGuard scope="manageArticles" redirect={false}>
          <Link href="/admin/articles">
            <li>
              <i className="fa fa-typewriter" />
            </li>
          </Link>
        </ScopeGuard>
        <ScopeGuard scope="managePermissions" redirect={false}>
          <Link href="/admin/permissions">
            <li>
              <i className="fa fa-shield" />
            </li>
          </Link>
        </ScopeGuard>
        <ScopeGuard scope="manageSite" redirect={false}>
          <Link href="/admin/configuration">
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
          <Link to="/me">
            <li>
              <i className="fa fa-external-link" />
            </li>
          </Link>
        </ul>
        <div className="notranslate">
          <b>Cerberus</b>
          <div>
            by&nbsp;<a href="https://github.com/habbo-hotel" target="_blank" style={{ cursor: 'pointer' }} className="lechris" rel="noreferrer"><b>LeChris</b></a>
          </div>
        </div>
      </footer>
    </SiteSidebarElement>
  )
}