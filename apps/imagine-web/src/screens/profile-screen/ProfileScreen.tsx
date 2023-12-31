import { useRoute } from 'wouter';
import React, { useEffect } from 'react';
import { useUserFetchOne } from '@imagine-cms/client';
import { GridLarge } from '../../components/grid/Grid.remix';
import { UserRoomsGrid } from '../../components/user-rooms-grid/UserRoomsGrid';
import { UserStatsGrid } from '../../components/user-stats-grid/UserStatsGrid';
import { UserFriendsGrid } from '../../components/user-friends-grid/UserFriendsGrid';
import { UserProfileContainer } from '../../components/user-profile-container/UserProfileContainer';
import { RPStatsGridContainer } from '../../components/rp-stats-grid-container/RPStatsGridContainer';

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
      {
        fetchUser.loading && <i className="fa fa-spinner fa-spin" />
      }
      {
        matchingProfile && (
          <GridLarge>
            <div><UserProfileContainer user={matchingProfile} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <UserStatsGrid user={matchingProfile} />
              <RPStatsGridContainer userID={fetchUser.data?.id} />
            </div>
            <div>
              <UserRoomsGrid user={matchingProfile} />
            </div>
            <div>
              <UserFriendsGrid user={matchingProfile} />
            </div>
          </GridLarge>
        )
      }
    </>
  )
}