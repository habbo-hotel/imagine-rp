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
import { SiteContainer } from './components/site-container/SiteContainer';

export const SITE_ROUTES: any[] = [
  {
    path: '/',
    guard: undefined,
    layout: SiteContainer,
    view: LandingScreen,
  },
  {
    path: '/imagine',
    guard: undefined,
    layout: SiteContainer,
    view: ImagineScreen,
  },
  {
    path: '/login',
    guard: GuestGuard,
    layout: SiteContainer,
    view: LoginScreen,
  },
  {
    path: '/login/discord',
    guard: GuestGuard,
    layout: SiteContainer,
    view: LoginWithDiscordScreen
  },
  {
    path: '/register',
    guard: GuestGuard,
    layout: SiteContainer,
    view: RegisterScreen
  },
  {
    path: '/forgot-password',
    guard: GuestGuard,
    layout: SiteContainer,
    view: ForgotPasswordScreen
  },
  {
    path: '/forgot-password/confirmation',
    guard: GuestGuard,
    layout: SiteContainer,
    view: ForgotPasswordLinkSentScreen
  },
  {
    path: '/forgot-password/redeem/:requestCode',
    guard: GuestGuard,
    layout: SiteContainer,
    view: ForgotPasswordRedeemCodeScreen
  },
  {
    path: '/logout',
    guard: undefined,
    layout: SiteContainer,
    view: LogoutScreen,
  },
  {
    path: '/me',
    guard: undefined,
    layout: SiteContainer,
    view: MeScreen,
  },
  {
    path: '/settings',
    guard: UserGuard,
    layout: SiteContainer,
    view: () => SettingsScreen
  },
  {
    path: '/profile/:username',
    guard: undefined,
    layout: SiteContainer,
    view: ProfileScreen,
  },
  {
    path: '/photos',
    guard: undefined,
    layout: SiteContainer,
    view: PhotoListScreen,
  },
  {
    path: '/photos/:photoID',
    layout: SiteContainer,
    view: PhotoViewScreen,
  },
  {
    path: '/play',
    guard: UserGuard,
    layout: SiteContainer,
    view: PlayGameScreen,
  },
  {
    path: '/ranks',
    guard: undefined,
    layout: SiteContainer,
    view: RankListScreen,
  },
  {
    path: '/ranks/:rankID',
    guard: undefined,
    layout: SiteContainer,
    view: RankViewScreen,
  },
  {
    path: '/community',
    guard: undefined,
    layout: SiteContainer,
    view: CommunityScreen,
  },
  {
    path: '/articles/:articleID',
    guard: undefined,
    layout: SiteContainer,
    view: ArticleViewScreen,
  },
  {
    path: '/high-scores/activity',
    guard: undefined,
    layout: SiteContainer,
    view: HighScoresActivityScreen,
  },
  {
    path: '/high-scores/crime',
    guard: undefined,
    layout: SiteContainer,
    view: HighScoresCrimeScreen,
  },
  {
    path: '/high-scores/economy',
    guard: undefined,
    layout: SiteContainer,
    view: HighScoresEconomyScreen,
  },
  {
    path: '/high-scores/roleplay',
    guard: undefined,
    layout: SiteContainer,
    view: HighScoresRoleplayScreen,
  },
  {
    path: '/rooms',
    guard: undefined,
    layout: SiteContainer,
    view: RoomListScreen,
  },
  {
    path: '/rooms/:roomID',
    guard: undefined,
    layout: SiteContainer,
    view: RoomViewScreen,
  },
  {
    path: '/badges',
    guard: undefined,
    layout: SiteContainer,
    view: BadgeListScreen,
  },
  {
    path: '/badges/:badgeCode',
    guard: undefined,
    layout: SiteContainer,
    view: BadgeViewScreen,
  },
  {
    path: '/gangs',
    guard: undefined,
    layout: SiteContainer,
    view: GangListScreen,
  },
  {
    path: '/gangs/:gangID',
    guard: undefined,
    layout: SiteContainer,
    view: GangViewScreen,
  },
  {
    path: '/corps',
    guard: undefined,
    layout: SiteContainer,
    view: CorpListcreen,
  },
  {
    path: '/corps/:corpID',
    guard: undefined,
    layout: SiteContainer,
    view: CorpViewScreen,
  },
]