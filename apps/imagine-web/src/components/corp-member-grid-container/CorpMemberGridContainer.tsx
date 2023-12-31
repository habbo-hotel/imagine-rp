import React, { useEffect } from 'react';
import { CorpMemberGridContainerProps } from './CorpMemberGridContainer.types';
import { SmallUserProfileContainerMock } from '../small-user-profile-container/SmallUserProfileContainerMock';
import { SmallUserProfileContainerLazy } from '../small-user-profile-container/SmallUserProfileContainerLazy';
import { useCorporationMemberFetchMany } from '@imagine-cms/client';

export function CorpMemberGridContainer({ corpID }: CorpMemberGridContainerProps) {
  const fetchCorpMembers = useCorporationMemberFetchMany();

  async function refresh() {
    await fetchCorpMembers.fetch({ corporationIDs: [corpID] });
  }

  useEffect(() => {
    refresh();
  }, [corpID]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
      {
        fetchCorpMembers.loading && (
          <>
            <SmallUserProfileContainerMock showMotto={false} showRank={false} />
          </>
        )
      }
      {
        fetchCorpMembers.data?.map(_ => (
          <SmallUserProfileContainerLazy key={`corp_member_${corpID}_${_.userID}`} userID={_.userID} showMotto={false} showRank={false} />
        ))
      }
    </div>
  )
}