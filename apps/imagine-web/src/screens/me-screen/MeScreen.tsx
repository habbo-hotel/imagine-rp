import { MOCK_USER } from '../../const';
import React, { useContext } from 'react';
import { sessionContext } from '@imagine-cms/web';
import { GridLarge } from '../../components/grid/Grid.remix';
import { UserStatsGrid } from '../../components/user-stats-grid/UserStatsGrid';
import { LatestArticlesGrid } from '../../components/latest-articles-grid/LatestArticlesGrid';
import { UserProfileContainer } from '../../components/user-profile-container/UserProfileContainer';
import { RPStatsGridContainer } from '../../components/rp-stats-grid-container/RPStatsGridContainer';

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
          <RPStatsGridContainer userID={user.id} />
        </div>
      </GridLarge>
      <LatestArticlesGrid />
    </>
  )
}
