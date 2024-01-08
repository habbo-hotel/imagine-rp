'use client'
import React, { useEffect } from 'react';
import { CorpRankGridContainerProps } from './CorpRankGridContainer.types';
import { Accordion } from '../accordion/Accordion';
import { useCorporationMemberFetchMany } from '@imagine-cms/client';
import { SmallUserProfileContainerMock } from '../small-user-profile-container/SmallUserProfileContainerMock';
import { SmallUserProfileContainerLazy } from '../small-user-profile-container/SmallUserProfileContainerLazy';

export function CorpRankGridContainer({ corporation, rank }: CorpRankGridContainerProps) {
  const fetchCorpMembers = useCorporationMemberFetchMany();

  async function refresh() {
    await fetchCorpMembers.fetch({ corporationIDs: [corporation.id] });
  }

  useEffect(() => {
    refresh()
  }, [corporation.id]);

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
      <div style={{ flex: 1 }}>{rank.name}</div>
      <div>({fetchCorpMembers.data?.length ?? 0})</div>
    </div >
  )


  return (
    <Accordion header={header}>
      {
        fetchCorpMembers.loading && (
          <>
            <SmallUserProfileContainerMock showMothref={false} showRank={false} />
          </>
        )
      }
      {
        fetchCorpMembers.data?.map(_ => (
          <SmallUserProfileContainerLazy key={`corp_member_${corporation.id}_${_.userID}`} userID={_.userID} showMothref={false} showRank={false} />
        ))
      }
      {
        !fetchCorpMembers.loading && fetchCorpMembers.data?.length === 0 && (
          <p>No members found</p>
        )
      }
    </Accordion>
  )
}