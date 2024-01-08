'use client'
import { MOCK_USER } from '../../site-ui.const';
import React, { useContext } from 'react';
import { sessionContext } from '@imagine-cms/web';
import { GridLarge } from '../../components/grid/Grid.remix';
import { UserStatsGrid } from '../../components/user-stats-grid/UserStatsGrid';
import { LatestArticlesGrid } from '../../components/latest-articles-grid/LatestArticlesGrid';
import { UserProfileContainer } from '../../components/user-profile-container/UserProfileContainer';
import { RPStatsGridContainer } from '../../components/rp-stats-grid-container/RPStatsGridContainer';
import { UserRoomsGrid } from '../../components/user-rooms-grid/UserRoomsGrid';
import { UserFriendsGrid } from '../../components/user-friends-grid/UserFriendsGrid';

export function MeScreen() {
  const { session } = useContext(sessionContext);

  const user: any = session ?? MOCK_USER;

  return (
    <>
      <GridLarge>
        <div>
          <UserProfileContainer user={user} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <UserStatsGrid user={user} />
          <br />
          <RPStatsGridContainer userID={user.id} />
        </div>
        <div>
          <UserFriendsGrid user={user} />
        </div>
        <div>
          <UserRoomsGrid user={user} />
        </div>
        <div>
          <LatestArticlesGrid />
        </div>
      </GridLarge>
    </>
  )
}
