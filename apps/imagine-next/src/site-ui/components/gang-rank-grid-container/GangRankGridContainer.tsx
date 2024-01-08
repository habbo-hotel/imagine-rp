'use client'
import React, { useEffect } from 'react';
import { Accordion } from '../accordion/Accordion';
import { SmallUserProfileContainerMock } from '../small-user-profile-container/SmallUserProfileContainerMock';
import { SmallUserProfileContainerLazy } from '../small-user-profile-container/SmallUserProfileContainerLazy';
import { useGangMemberFetchMany } from '@imagine-cms/client';
import { GangRankGridContainerProps } from './GangRankGridContainer.types';

export function GangRankGridContainer({ gang, rank }: GangRankGridContainerProps) {
  const fetchGangMembers = useGangMemberFetchMany();

  async function refresh() {
    await fetchGangMembers.fetch({ gangIDs: [gang.id] });
  }

  useEffect(() => {
    refresh()
  }, [gang.id]);

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
      <div style={{ flex: 1 }}>{rank.name}</div>
      <div>({fetchGangMembers.data?.length ?? 0})</div>
    </div >
  )


  return (
    <Accordion header={header}>
      {
        fetchGangMembers.loading && (
          <>
            <SmallUserProfileContainerMock showMothref={false} showRank={false} />
          </>
        )
      }
      {
        fetchGangMembers.data?.map(_ => (
          <SmallUserProfileContainerLazy key={`gang_member_${gang.id}_${_.userID}`} userID={_.userID} showMothref={false} showRank={false} />
        ))
      }
      {
        !fetchGangMembers.loading && fetchGangMembers.data?.length === 0 && (
          <p>No members found</p>
        )
      }
    </Accordion>
  )
}