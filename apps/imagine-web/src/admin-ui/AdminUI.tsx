import { RouteScopeGuard } from "@imagine-cms/web";
import { RouteDeclaration } from "../ImagineWeb.types";
import { DashboardScreen } from "./screens/dashboard-screen/DashboardScreen";
import { RoomsOverviewScreen } from "./screens/rooms-overview-screen/RoomsOverviewScreen";
import { UsersOverviewScreen } from "./screens/users-overview-screen/UsersOverviewScreen";
import { RoomsViewRoomScreen } from "./screens/rooms-view-room-screen/RoomsViewRoomScreen";
import { UserEditProfileScreen } from "./screens/user-edit-profile-screen/UserEditProfileScreen";
import { PermissionsOverviewScreen } from "./screens/permissions-overview-screen/PermissionsOverviewScreen";
import { PermissionsEditRankScreen } from "./screens/permissions-edit-rank-screen/PermissionsEditRankScreen";
import { NewsArticlesOverviewScreen } from "./screens/news-articles-overview-screen/NewsArticlesOverviewScreen";
import { ConfigurationOverviewScreen } from "./screens/configuration-overview-screen/ConfigurationOverviewScreen";
import { NewsArticlesEditArticleScreen } from "./screens/news-articles-edit-article-screen/NewsArticlesEditArticleScreen";
import { NewsArticlesCreateArticleScreen } from "./screens/news-articles-create-article-screen/NewsArticlesCreateArticleScreen";
import { AdminContainer } from "./components/admin-container/AdminContainer";

export const ADMIN_ROUTES: RouteDeclaration[] = [
  {
    path: '/admin/dashboard',
    view: DashboardScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('accessAdminPanel'),
  },
  {
    path: '/admin/dashboard',
    view: DashboardScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('accessAdminPanel'),
  },
  {
    path: '/admin/users',
    view: UsersOverviewScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('manageUsers'),
  },
  {
    path: '/admin/users/:username',
    view: UserEditProfileScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('manageUsers'),
  },
  {
    path: '/admin/rooms/:roomID',
    view: RoomsViewRoomScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('manageUsers'),
  },
  {
    path: '/admin/articles',
    view: NewsArticlesOverviewScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('manageArticles'),
  },
  {
    path: '/admin/articles/create',
    view: NewsArticlesCreateArticleScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('manageArticles'),
  },
  {
    path: '/admin/articles/:articleID',
    view: NewsArticlesEditArticleScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('manageArticles'),
  },
  {
    path: '/admin/rooms',
    view: RoomsOverviewScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('accessAdminPanel'),
  },
  {
    path: '/admin/permissions',
    view: PermissionsOverviewScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('managePermissions'),
  },
  {
    path: '/admin/permissions/:rankID',
    view: PermissionsEditRankScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('managePermissions'),
  },
  {
    path: '/admin/configuration',
    view: ConfigurationOverviewScreen,
    layout: AdminContainer,
    guard: RouteScopeGuard('accessAdminPanel'),
  },
]