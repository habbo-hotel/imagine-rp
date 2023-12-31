import React, { useEffect } from 'react';
import { GangMemberGridContainerProps } from './GangMemberGridContainer.types';
import { useGangMemberFetchMany } from '@imagine-cms/client';
import { SmallUserProfileContainerMock } from '../small-user-profile-container/SmallUserProfileContainerMock';
import { SmallUserProfileContainerLazy } from '../small-user-profile-container/SmallUserProfileContainerLazy';

export function GangMemberGridContainer({ gangID }: GangMemberGridContainerProps) {
  const fetchGangMembers = useGangMemberFetchMany();

  async function refresh() {
    await fetchGangMembers.fetch({ gangIDs: [gangID] });
  }

  useEffect(() => {
    refresh();
  }, [gangID]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
      {
        fetchGangMembers.loading && (
          <>
            <SmallUserProfileContainerMock showMotto={false} showRank={false} />
          </>
        )
      }
      {
        fetchGangMembers.data?.map(_ => (
          <SmallUserProfileContainerLazy key={`gang_member_${gangID}_${_.userID}`} userID={_.userID} showMotto={false} showRank={false} />
        ))
      }
      {
        !fetchGangMembers.loading && fetchGangMembers.data?.length === 0 && (
          <p>No members found</p>
        )
      }
    </div>
  )
}