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
import { GroupViewScreen } from './group-view-screen/GroupViewScreen';
import { BadgeListScreen } from './badge-list-screen/BadgeListScreen';
import { BadgeViewScreen } from './badge-view-screen/BadgeViewScreen';
import { GroupListScreen } from './group-list-screen/GroupListScreen';
import { HighScoresScreen } from './high-scores-screen/HighScoresScreen';
import { ArticleViewScreen } from './article-view-screen/ArticleViewScreen';
import { PageNotFoundScreen } from './page-not-found-screen/PageNotFoundScreen';
import { ForgotPasswordScreen } from './forgot-password-screen/ForgotPasswordScreen';
import { LoginWithGoogleScreen } from './login-with-google-screen/LoginWithGoogleScreen';
import { LoginWithDiscordScreen } from './login-with-discord-screen/LoginWithDiscordScreen';
import { LoginWithFacebookScreen } from './login-with-facebook-screen/LoginWithFacebookScreen';
import { ForgotPasswordLinkSentScreen } from './forgot-password-link-sent-screen/ForgotPasswordLinkSentScreen';
import { ForgotPasswordRedeemCodeScreen } from './forgot-password-redeem-code-screen/ForgotPasswordRedeemCodeScreen';
import { GangListScreen } from './gang-list-screen/GangListScreen';
import { GangViewScreen } from './gang-view-screen/GangViewScreen';
import { CorpListcreen } from './corp-list-screen/CorpListScreen';
import { CorpViewScreen } from './corp-view-screen/CorpViewScreen';

const SITE_ROUTES: Array<{ path: string, view: any, }> = [
  {
    path: '/',
    view: LandingScreen,
  },
  {
    path: '/about',
    view: ImagineScreen,
  },
  {
    path: '/login',
    view: (
      <GuestGuard redirect>
        <LoginScreen />
      </GuestGuard>
    ),
  },
  {
    path: '/login/discord',
    view: (
      <GuestGuard redirect>
        <LoginWithDiscordScreen />
      </GuestGuard>
    ),
  },
  {
    path: '/login/facebook',
    view: (
      <GuestGuard redirect>
        <LoginWithFacebookScreen />
      </GuestGuard>
    ),
  },
  {
    path: '/login/google',
    view: (
      <GuestGuard redirect>
        <LoginWithGoogleScreen />
      </GuestGuard>
    ),
  },
  {
    path: '/register',
    view: (
      <GuestGuard redirect>
        <RegisterScreen />
      </GuestGuard>
    ),
  },
  {
    path: '/forgot-password',
    view: (
      <GuestGuard redirect>
        <ForgotPasswordScreen />
      </GuestGuard>
    ),
  },
  {
    path: '/forgot-password/confirmation',
    view: (
      <GuestGuard redirect>
        <ForgotPasswordLinkSentScreen />
      </GuestGuard>
    ),
  },
  {
    path: '/forgot-password/redeem/:requestCode',
    view: (
      <GuestGuard redirect>
        <ForgotPasswordRedeemCodeScreen />
      </GuestGuard>
    ),
  },
  {
    path: '/logout',
    view: (
      <UserGuard redirect>
        <LogoutScreen />
      </UserGuard>
    ),
  },
  {
    path: '/me',
    view: MeScreen,
  },
  {
    path: '/settings',
    view: () => (
      <UserGuard redirect>
        <SettingsScreen />
      </UserGuard>
    ),
  },
  {
    path: '/profile/:username',
    view: ProfileScreen,
  },
  {
    path: '/photos',
    view: PhotoListScreen,
  },
  {
    path: '/photos/:photoID',
    view: PhotoViewScreen,
  },
  {
    path: '/play',
    view: PlayGameScreen,
  },
  {
    path: '/ranks',
    view: RankListScreen,
  },
  {
    path: '/ranks/:rankID',
    view: RankViewScreen,
  },
  {
    path: '/community',
    view: CommunityScreen,
  },
  {
    path: '/articles/:articleID',
    view: ArticleViewScreen,
  },
  {
    path: '/high-scores',
    view: HighScoresScreen,
  },
  {
    path: '/rooms',
    view: RoomListScreen,
  },
  {
    path: '/rooms/:roomID',
    view: RoomViewScreen,
  },
  {
    path: '/groups',
    view: GroupListScreen,
  },
  {
    path: '/groups/:groupID',
    view: GroupViewScreen,
  },
  {
    path: '/badges',
    view: BadgeListScreen,
  },
  {
    path: '/badges/:badgeCode',
    view: BadgeViewScreen,
  },
  {
    path: '/gangs',
    view: GangListScreen,
  },
  {
    path: '/gangs/:gangID',
    view: GangViewScreen,
  },
  {
    path: '/corps',
    view: CorpListcreen,
  },
  {
    path: '/corps/:corpID',
    view: CorpViewScreen,
  },
]

export function Router() {
  return (
    <Switch>
      <>
        {
          SITE_ROUTES.map(route => (
            <Route key={`route_${route.path}`} path={route.path} component={route.view} />
          ))
        }
      </>
      <Route component={PageNotFoundScreen} />
    </Switch>
  )
}
