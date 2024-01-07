import { RouteScopeGuard } from "@imagine-cms/web";
import { DashboardScreen } from "./screens/dashboard-screen/DashboardScreen";
import { UsersOverviewScreen } from "./screens/users-overview-screen/UsersOverviewScreen";
import { UserEditProfileScreen } from "./screens/user-edit-profile-screen/UserEditProfileScreen";
import { RoomsViewRoomScreen } from "./screens/rooms-view-room-screen/RoomsViewRoomScreen";
import { NewsArticlesEditArticleScreen } from "./screens/news-articles-edit-article-screen/NewsArticlesEditArticleScreen";
import { NewsArticlesCreateArticleScreen } from "./screens/news-articles-create-article-screen/NewsArticlesCreateArticleScreen";
import { NewsArticlesOverviewScreen } from "./screens/news-articles-overview-screen/NewsArticlesOverviewScreen";
import { RoomsOverviewScreen } from "./screens/rooms-overview-screen/RoomsOverviewScreen";
import { ConfigurationOverviewScreen } from "./screens/configuration-overview-screen/ConfigurationOverviewScreen";
import { PermissionsEditRankScreen } from "./screens/permissions-edit-rank-screen/PermissionsEditRankScreen";
import { PermissionsOverviewScreen } from "./screens/permissions-overview-screen/PermissionsOverviewScreen";
import { RouteDeclaration } from "../ImagineWeb.types";


export const ADMIN_ROUTES: RouteDeclaration[] = [
  {
    path: '/admin/dashboard',
    view: DashboardScreen,
    guard: RouteScopeGuard('accessAdminPanel'),
  },
  {
    path: '/admin/dashboard',
    view: DashboardScreen,
    guard: RouteScopeGuard('accessAdminPanel'),
  },
  {
    path: '/admin/users',
    view: UsersOverviewScreen,
    guard: RouteScopeGuard('manageUsers'),
  },
  {
    path: '/admin/users/:username',
    view: UserEditProfileScreen,
    guard: RouteScopeGuard('manageUsers'),
  },
  {
    path: '/admin/rooms/:roomID',
    view: RoomsViewRoomScreen,
    guard: RouteScopeGuard('manageUsers'),
  },
  {
    path: '/admin/articles',
    view: NewsArticlesOverviewScreen,
    guard: RouteScopeGuard('manageArticles'),
  },
  {
    path: '/admin/articles/create',
    view: NewsArticlesCreateArticleScreen,
    guard: RouteScopeGuard('manageArticles'),
  },
  {
    path: '/admin/articles/:articleID',
    view: NewsArticlesEditArticleScreen,
    guard: RouteScopeGuard('manageArticles'),
  },
  {
    path: '/admin/rooms',
    view: RoomsOverviewScreen,
    guard: RouteScopeGuard('accessAdminPanel'),
  },
  {
    path: '/admin/permissions',
    view: PermissionsOverviewScreen,
    guard: RouteScopeGuard('managePermissions'),
  },
  {
    path: '/admin/permissions/:rankID',
    view: PermissionsEditRankScreen,
    guard: RouteScopeGuard('managePermissions'),
  },
  {
    path: '/admin/configuration',
    view: ConfigurationOverviewScreen,
    guard: RouteScopeGuard('accessAdminPanel'),
  },
]