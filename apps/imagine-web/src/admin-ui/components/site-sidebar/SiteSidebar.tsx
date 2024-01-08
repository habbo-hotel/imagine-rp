import React from 'react';
import { useLocation } from 'wouter';
import { Link } from '../../blocks/link/Link';
import { ScopeGuard } from '@imagine-cms/web';
import { SiteSidebarElement } from './SiteSidebar.styled';
import { ButtonBrand } from '../../../site-ui/components/button/Button.remix';

export function SiteSidebar() {
  const [, setLocation] = useLocation();

  function onViewCerberusAbout() {
    setLocation('/admin/cerberus');
  }
  return (
    <SiteSidebarElement>
      <ul>
        <Link href="/admin/dashboard">
          <li>
            <i className="fa fa-home" />
          </li>
        </Link>
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
          <Link to="/me">
            <ButtonBrand>
              Go to site
            </ButtonBrand>
          </Link>
        </ul>
        <div className="notranslate">
          <b style={{ cursor: 'pointer' }} onClick={onViewCerberusAbout}>Cerberus</b>
          <div>
            by&nbsp;<a href="https://github.com/habbo-hotel" target="_blank" style={{ cursor: 'pointer' }} className="lechris" rel="noreferrer"><b>LeChris</b></a>
          </div>
        </div>
      </footer>
    </SiteSidebarElement>
  )
}