import { LandingScreen } from './screens/landing-screen/LandingScreen';
import { ImagineScreen } from './screens/imagine-screen/ImagineScreen';
import { GuestGuard, UserGuard } from '@imagine-cms/web';
import { LoginScreen } from './screens/login-screen/LoginScreen';
import { LoginWithDiscordScreen } from './screens/login-with-discord-screen/LoginWithDiscordScreen';
import { RegisterScreen } from './screens/register-screen/RegisterScreen';
import { ForgotPasswordScreen } from './screens/forgot-password-screen/ForgotPasswordScreen';
import { ForgotPasswordLinkSentScreen } from './screens/forgot-password-link-sent-screen/ForgotPasswordLinkSentScreen';
import { ForgotPasswordRedeemCodeScreen } from './screens/forgot-password-redeem-code-screen/ForgotPasswordRedeemCodeScreen';
import { ProfileScreen } from './screens/profile-screen/ProfileScreen';
import { MeScreen } from './screens/me-screen/MeScreen';
import { LogoutScreen } from './screens/logout-screen/LogoutScreen';
import { SettingsScreen } from './screens/settings-screen/SettingsScreen';
import { PhotoViewScreen } from './screens/photo-view-screen/PhotoViewScreen';
import { PhotoListScreen } from './screens/photo-list-screen/PhotoListScreen';
import { RankListScreen } from './screens/rank-list-screen/RankListScreen';
import { PlayGameScreen } from './screens/play-game-screen/PlayGameScreen';
import { RankViewScreen } from './screens/rank-view-screen/RankViewScreen';
import { HighScoresActivityScreen } from './screens/high-scores-activity-screen/HighScoresActivityScreen';
import { ArticleViewScreen } from './screens/article-view-screen/ArticleViewScreen';
import { CommunityScreen } from './screens/community-screen/CommunityScreen';
import { GangViewScreen } from './screens/gang-view-screen/GangViewScreen';
import { CorpViewScreen } from './screens/corp-view-screen/CorpViewScreen';
import { CorpListcreen } from './screens/corp-list-screen/CorpListScreen';
import { GangListScreen } from './screens/gang-list-screen/GangListScreen';
import { BadgeViewScreen } from './screens/badge-view-screen/BadgeViewScreen';
import { BadgeListScreen } from './screens/badge-list-screen/BadgeListScreen';
import { RoomViewScreen } from './screens/room-view-screen/RoomViewScreen';
import { RoomListScreen } from './screens/room-list-screen/RoomListScreen';
import { HighScoresRoleplayScreen } from './screens/high-scores-roleplay-screen/HighScoresRoleplayScreen';
import { HighScoresEconomyScreen } from './screens/high-scores-economy-screen/HighScoresEconomyScreen';
import { HighScoresCrimeScreen } from './screens/high-scores-crime-screen/HighScoresCrimeScreen';
import { RouteDeclaration } from '../ImagineWeb.types';

export const SITE_ROUTES: RouteDeclaration[] = [
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
    guard: UserGuard,
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
    path: '/high-scores/activity',
    guard: undefined,
    view: HighScoresActivityScreen,
  },
  {
    path: '/high-scores/crime',
    guard: undefined,
    view: HighScoresCrimeScreen,
  },
  {
    path: '/high-scores/economy',
    guard: undefined,
    view: HighScoresEconomyScreen,
  },
  {
    path: '/high-scores/roleplay',
    guard: undefined,
    view: HighScoresRoleplayScreen,
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