import React from 'react';
import { Switch, Route } from 'wouter';
import { GuestGuard, UserGuard } from '@imagine-cms/web';
import { MeScreen } from './me-screen/MeScreen';
import { LoginScreen } from './login-screen/LoginScreen';
import { LogoutScreen } from './logout-screen/LogoutScreen';
import { ImagineScreen } from './imagine-screen/ImagineScreen';
import { ProfileScreen } from './profile-screen/ProfileScreen';
import { LandingScreen } from './landing-screen/LandingScreen';
import { SettingsScreen } from './settings-screen/SettingsScreen';
import { RegisterScreen } from './register-screen/RegisterScreen';
import { RankViewScreen } from './rank-view-screen/RankViewScreen';
import { PlayGameScreen } from './play-game-screen/PlayGameScreen';
import { RoomViewScreen } from './room-view-screen/RoomViewScreen';
import { RankListScreen } from './rank-list-screen/RankListScreen';
import { RoomListScreen } from './room-list-screen/RoomListScreen';
import { CommunityScreen } from './community-screen/CommunityScreen';
import { PhotoViewScreen } from './photo-view-screen/PhotoViewScreen';
import { PhotoListScreen } from './photo-list-screen/PhotoListScreen';
import { BadgeListScreen } from './badge-list-screen/BadgeListScreen';
import { BadgeViewScreen } from './badge-view-screen/BadgeViewScreen';
import { HighScoresScreen } from './high-scores-screen/HighScoresScreen';
import { ArticleViewScreen } from './article-view-screen/ArticleViewScreen';
import { PageNotFoundScreen } from './page-not-found-screen/PageNotFoundScreen';
import { ForgotPasswordScreen } from './forgot-password-screen/ForgotPasswordScreen';
import { LoginWithDiscordScreen } from './login-with-discord-screen/LoginWithDiscordScreen';
import { ForgotPasswordLinkSentScreen } from './forgot-password-link-sent-screen/ForgotPasswordLinkSentScreen';
import { ForgotPasswordRedeemCodeScreen } from './forgot-password-redeem-code-screen/ForgotPasswordRedeemCodeScreen';
import { GangListScreen } from './gang-list-screen/GangListScreen';
import { GangViewScreen } from './gang-view-screen/GangViewScreen';
import { CorpListcreen } from './corp-list-screen/CorpListScreen';
import { CorpViewScreen } from './corp-view-screen/CorpViewScreen';

const SITE_ROUTES: Array<{ path: string, view: any, guard?: any, }> = [
  {
    path: '/',
    guard: undefined,
    view: LandingScreen,
  },
  {
    path: '/about',
    guard: undefined,
    view: ImagineScreen,
  },
  {
    path: '/login',
    guard: GuestGuard,
    view: LoginScreen,
  },
  {
    path: '/login/discord',
    guard: GuestGuard,
    view: LoginWithDiscordScreen
  },
  {
    path: '/register',
    guard: GuestGuard,
    view: RegisterScreen
  },
  {
    path: '/forgot-password',
    guard: GuestGuard,
    view: ForgotPasswordScreen
  },
  {
    path: '/forgot-password/confirmation',
    guard: GuestGuard,
    view: ForgotPasswordLinkSentScreen
  },
  {
    path: '/forgot-password/redeem/:requestCode',
    guard: GuestGuard,
    view: ForgotPasswordRedeemCodeScreen
  },
  {
    path: '/logout',
    guard: undefined,
    view: LogoutScreen,
  },
  {
    path: '/me',
    guard: undefined,
    view: MeScreen,
  },
  {
    path: '/settings',
    guard: UserGuard,
    view: () => SettingsScreen
  },
  {
    path: '/profile/:username',
    guard: undefined,
    view: ProfileScreen,
  },
  {
    path: '/photos',
    guard: undefined,
    view: PhotoListScreen,
  },
  {
    path: '/photos/:photoID',
    view: PhotoViewScreen,
  },
  {
    path: '/play',
    guard: undefined,
    view: PlayGameScreen,
  },
  {
    path: '/ranks',
    guard: undefined,
    view: RankListScreen,
  },
  {
    path: '/ranks/:rankID',
    guard: undefined,
    view: RankViewScreen,
  },
  {
    path: '/community',
    guard: undefined,
    view: CommunityScreen,
  },
  {
    path: '/articles/:articleID',
    view: ArticleViewScreen,
  },
  {
    path: '/high-scores',
    guard: undefined,
    view: HighScoresScreen,
  },
  {
    path: '/rooms',
    guard: undefined,
    view: RoomListScreen,
  },
  {
    path: '/rooms/:roomID',
    guard: undefined,
    view: RoomViewScreen,
  },
  {
    path: '/badges',
    guard: undefined,
    view: BadgeListScreen,
  },
  {
    path: '/badges/:badgeCode',
    guard: undefined,
    view: BadgeViewScreen,
  },
  {
    path: '/gangs',
    guard: undefined,
    view: GangListScreen,
  },
  {
    path: '/gangs/:gangID',
    guard: undefined,
    view: GangViewScreen,
  },
  {
    path: '/corps',
    guard: undefined,
    view: CorpListcreen,
  },
  {
    path: '/corps/:corpID',
    guard: undefined,
    view: CorpViewScreen,
  },
]

export function Router() {
  return (
    <Switch>
      <>
        {
          SITE_ROUTES.map(route => {
            const Component = route.guard ? <route.guard redirect><route.view /></route.guard> : <route.view />

            return <Route key={`route_${route.path}`} path={route.path} children={Component} />
          })
        }
      </>
      <Route component={PageNotFoundScreen} />
    </Switch>
  )
}
