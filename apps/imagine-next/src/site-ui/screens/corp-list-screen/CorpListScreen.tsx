'use client'
import { useCorporationFetchMany } from '@imagine-cms/client';
import React, { useEffect } from 'react';
import { CorpGridContainerMock } from '../../components/corp-grid-container/CorpGridContainer.mock';
import { CorpGridContainer } from '../../components/corp-grid-container/CorpGridContainer';
import { GridMedium } from '../../components/grid/Grid.remix';

const MOCK_CORPORATIONS = Array(9).fill(null).map((_, i) => <CorpGridContainerMock key={`corp_grid_mock_${i}`} />)

export function CorpListcreen() {
  const corpFetchMany = useCorporationFetchMany();

  useEffect(() => {
    corpFetchMany.fetch({});
  }, []);

  return (
    <>
      <h1>Corporations</h1>
      <GridMedium>
        {
          corpFetchMany.loading && MOCK_CORPORATIONS}
        {
          corpFetchMany.data?.map(_ => (
            <CorpGridContainer corporation={_} key={`corp_grid_container_${_.id}`} />
          ))
        }
      </GridMedium>
    </>
  )
}