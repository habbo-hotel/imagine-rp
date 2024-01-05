import React from 'react';
import { Switch, Route } from 'wouter';
import { SignInScreen } from './sign-in-screen/SignInScreen';
import { SiteRoute } from '../components/site-route/SiteRoute';
import { DashboardScreen } from './dashboard-screen/DashboardScreen';
import { GuestGuard, RouteScopeGuard, UserGuard } from '@imagine-cms/web';
import { SiteRouteProps } from '../components/site-route/SiteRoute.types';
import { PageNotFoundScreen } from './page-not-found-screen/PageNotFoundScreen';
import { RoomsOverviewScreen } from './rooms-overview-screen/RoomsOverviewScreen';
import { UsersOverviewScreen } from './users-overview-screen/UsersOverviewScreen';
import { RoomsViewRoomScreen } from './rooms-view-room-screen/RoomsViewRoomScreen';
import { UserEditProfileScreen } from './user-edit-profile-screen/UserEditProfileScreen';
import { PermissionsOverviewScreen } from './permissions-overview-screen/PermissionsOverviewScreen';
import { PermissionsEditRankScreen } from './permissions-edit-rank-screen/PermissionsEditRankScreen';
import { NewsArticlesOverviewScreen } from './news-articles-overview-screen/NewsArticlesOverviewScreen';
import { ConfigurationOverviewScreen } from './configuration-overview-screen/ConfigurationOverviewScreen';
import { NewsArticlesEditArticleScreen } from './news-articles-edit-article-screen/NewsArticlesEditArticleScreen';
import { NewsArticlesCreateArticleScreen } from './news-articles-create-article-screen/NewsArticlesCreateArticleScreen';
import { SignOutScreen } from './sign-out-screen/SignOutScreen';

const SITE_ROUTES: SiteRouteProps[] = [
  {
    path: '/login',
    view: SignInScreen,
    guard: GuestGuard
  },
  {
    path: '/logout',
    view: SignOutScreen,
    guard: UserGuard
  },
  {
    path: '/me',
    view: DashboardScreen,
    guard: UserGuard,
  },
  {
    path: '/dashboard',
    view: DashboardScreen,
    guard: UserGuard,
  },
  {
    path: '/users',
    view: UsersOverviewScreen,
    guard: RouteScopeGuard('manageUsers'),
  },
  {
    path: '/users/:username',
    view: UserEditProfileScreen,
    guard: RouteScopeGuard('manageUsers'),
  },
  {
    path: '/rooms/:roomID',
    view: RoomsViewRoomScreen,
    guard: RouteScopeGuard('manageUsers'),
  },
  {
    path: '/articles',
    view: NewsArticlesOverviewScreen,
    guard: RouteScopeGuard('manageArticles'),
  },
  {
    path: '/articles/create',
    view: NewsArticlesCreateArticleScreen,
    guard: RouteScopeGuard('manageArticles'),
  },
  {
    path: '/articles/:articleID',
    view: NewsArticlesEditArticleScreen,
    guard: RouteScopeGuard('manageArticles'),
  },
  {
    path: '/rooms',
    view: RoomsOverviewScreen,
    guard: UserGuard,
  },
  {
    path: '/permissions',
    view: PermissionsOverviewScreen,
    guard: RouteScopeGuard('managePermissions'),
  },
  {
    path: '/permissions/:rankID',
    view: PermissionsEditRankScreen,
    guard: RouteScopeGuard('managePermissions'),
  },
  {
    path: '/configuration',
    view: ConfigurationOverviewScreen,
    guard: UserGuard,
  },
]

export function Router() {
  return (
    <Switch>
      <>
        {
          SITE_ROUTES.map(route => (
            <SiteRoute key={`route_${route.path}`} {...route} />
          ))
        }
      </>
      <Route component={PageNotFoundScreen} />
    </Switch>
  )
}
