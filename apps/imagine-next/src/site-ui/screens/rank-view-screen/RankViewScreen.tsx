'use client'
import React, { useEffect } from 'react';
import { Card } from '../../components/card/Card';
import { useRankFetchOne } from '@imagine-cms/client';
import { GridLargeSmall } from '../../components/grid/Grid.remix';
import { RankListContainer } from '../../components/rank-list-container/RankListContainer';
import { RankListContainerMock } from '../../components/rank-list-container/RankListContainer.mock';
import { RankCreateApplicationForm } from '../../components/rank-create-application-form/RankCreateApplicationForm';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export function RankViewScreen() {
  const params = useParams<{ rankID: string }>();
  const rankID = Number(params!.rankID);
  const fetchRank = useRankFetchOne();

  useEffect(() => {
    fetchRank.fetch({ id: rankID })
  }, [rankID]);

  return (
    <>
      <h1><Link href="/ranks"><i className="fa fa-caret-left" style={{ cursor: 'pointer', marginRight: 8 }} /></Link>Ranks - {!fetchRank.data ? <i className="fa fa-spinner fa-spin" /> : fetchRank.data!.name}</h1>
      <GridLargeSmall>
        {
          fetchRank.data ? <RankListContainer rank={fetchRank.data} showApplicationsButton={false} /> : <RankListContainerMock />
        }
        {
          fetchRank.data?.flags?.acceptingApplications && (
            <Card header="Apply for role">
              <RankCreateApplicationForm rank={fetchRank.data} />
            </Card>
          )
        }
      </GridLargeSmall>
    </>
  )
}