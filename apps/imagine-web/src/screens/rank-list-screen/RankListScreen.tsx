import React, { useEffect } from 'react';
import { useRankFetchMany } from '@imagine-cms/client';
import { GridLarge } from '../../components/grid/Grid.remix';
import { RankListContainer } from '../../components/rank-list-container/RankListContainer';
import { RankListContainerMock } from '../../components/rank-list-container/RankListContainer.mock';

const RANK_MOCK_CONTAINERS = Array(4).fill(null).map((_, i) => <RankListContainerMock key={`rank_mock_${i}`} />)

export function RankListScreen() {
  const { data, fetch, loading } = useRankFetchMany();

  useEffect(() => {
    fetch({ staffOnly: true })
  }, []);

  if (loading) {
    return (
      <GridLarge>
        {RANK_MOCK_CONTAINERS}
      </GridLarge>
    )
  }

  return (

    <GridLarge>
      {
        data?.map(_ => (
          <RankListContainer key={`rank_${_.id}`} rank={_} />
        ))
      }
    </GridLarge>
  )
}
