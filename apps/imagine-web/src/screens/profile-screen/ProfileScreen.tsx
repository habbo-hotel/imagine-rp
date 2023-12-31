import { useRoute } from 'wouter';
import React, { useEffect } from 'react';
import { useUserFetchOne } from '@imagine-cms/client';
import { GridLarge } from '../../components/grid/Grid.remix';
import { UserRoomsGrid } from '../../components/user-rooms-grid/UserRoomsGrid';
import { UserStatsGrid } from '../../components/user-stats-grid/UserStatsGrid';
import { UserFriendsGrid } from '../../components/user-friends-grid/UserFriendsGrid';
import { UserProfileContainer } from '../../components/user-profile-container/UserProfileContainer';
import { RPStatsGridContainer } from '../../components/rp-stats-grid-container/RPStatsGridContainer';
import { UserProfileContainerMock } from '../../components/user-profile-container/UserProfileContainer.mock';
import { UserRoomsGridMock } from '../../components/user-rooms-grid/UserRoomsGrid.mock';
import { UserFriendsGridMock } from '../../components/user-friends-grid/UserFriendsGrid.mock';

export function ProfileScreen() {
  const [_, params] = useRoute<{ username: string }>('/profile/:username');

  const username = params!.username;

  const fetchUser = useUserFetchOne();

  useEffect(() => {
    fetchUser.fetch({ username })
  }, [username]);


  const matchingProfile = fetchUser?.data;

  return (
    <>
      <h1>Viewing Profile:</h1>
      <br />
      <GridLarge>
        <div>
          {matchingProfile ? <UserProfileContainer user={matchingProfile} /> : <UserProfileContainerMock />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <UserStatsGrid user={matchingProfile} />
          <RPStatsGridContainer userID={fetchUser.data?.id} />
        </div>
        <div>
          {matchingProfile ? <UserRoomsGrid user={matchingProfile} /> : <UserRoomsGridMock />}
        </div>
        <div>
          {matchingProfile ? <UserFriendsGrid user={matchingProfile} /> : <UserFriendsGridMock />}
        </div>
      </GridLarge>
    </>
  )
}