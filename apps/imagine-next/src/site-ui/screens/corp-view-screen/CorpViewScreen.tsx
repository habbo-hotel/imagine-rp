'use client'
import { useCorporationFetchOne, useCorporationRankFetchMany } from '@imagine-cms/client';
import React, { useContext, useEffect } from 'react';
import { GridLarge } from '../../components/grid/Grid.remix';
import { configContext } from '@imagine-cms/web';
import { CorpGridContainerBadge } from '../../components/corp-grid-container/CorpGridContainer.styled';
import DayJS from 'dayjs';
import { Card } from '../../components/card/Card';
import { SmallUserProfileContainer } from '../../components/small-user-profile-container/SmallUserProfileContainer';
import { RoomGridContainer } from '../../components/room-grid-container/RoomGridContainer';
import { CorpRankGridContainer } from '../../components/corp-rank-grid-container/CorpRankGridContainer';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export function CorpViewScreen() {
  const { config } = useContext(configContext);
  const params = useParams<{ corpID: string }>();
  const corpID = Number(params!.corpID);
  const fetchCorp = useCorporationFetchOne();
  const fetchCorpRanks = useCorporationRankFetchMany();

  async function refresh() {
    await fetchCorp.fetch({ id: corpID });
    await fetchCorpRanks.fetch({ corporationIDs: [corpID] });
  }

  useEffect(() => {
    refresh();
  }, [corpID]);

  return (
    <>
      <div style={{ display: 'flex', flex: 1, gap: '1.4rem', marginBottom: '2rem' }}>
        <Link href="/corps">
          <i className="fa fa-caret-left fa-4x" style={{ cursor: 'pointer' }} />
        </Link>
        <div style={{ display: 'flex', flex: 1, gap: '1.4rem', alignItems: 'center' }}>
          <CorpGridContainerBadge src={`${config!.badgeURL}/${fetchCorp.data?.badgeCode}.${config!.badgeEXT}`} />
          <div>
            <h4 style={{ margin: 0 }}>Corporations - Viewing:</h4>
            <h1 style={{ margin: 0, fontWeight: 'bold' }}>{fetchCorp.data?.name ?? `#${corpID}`}</h1>
          </div>
        </div>
      </div>
      <GridLarge>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 16 }}>
          <h2>About</h2>
          <Card>
            <div>
              <h4>Founded:</h4>
              <h3>{DayJS().format('MMMM DD, YYYY')}</h3>
            </div>

            <div>
              <h4>Owned By:</h4>
              <div style={{ maxWidth: 200 }}>
                {
                  fetchCorp.data
                    ? <SmallUserProfileContainer user={fetchCorp.data.user as any} showMothref={false} showRank={false} />
                    : <i className="fa fa-spinner fa-spin" />
                }
              </div>
            </div>
            <div>
              <h4>Based in:</h4>
              {
                fetchCorp.data
                  ? <RoomGridContainer room={fetchCorp.data.room} />
                  : <i className="fa fa-spinner fa-spin" />
              }
            </div>
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Ranks</h2>
          <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 500, overflowY: 'auto', gap: 16 }}>
            {
              fetchCorp.data && fetchCorpRanks.data?.map(_ => (
                <CorpRankGridContainer key={`corp_rank_${_.corporationRankID}`} corporation={fetchCorp.data!} rank={_} />
              ))
            }
          </div>
        </div>
      </GridLarge>
    </>
  )
}