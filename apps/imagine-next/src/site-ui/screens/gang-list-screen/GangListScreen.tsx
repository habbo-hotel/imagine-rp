'use client'
import { useGangFetchMany } from '@imagine-cms/client';
import React, { useEffect } from 'react';
import { GangGridContainerMock } from '../../components/gang-grid-container/GangGridContainer.mock';
import { GangGridContainer } from '../../components/gang-grid-container/GangGridContainer';
import { GridMedium } from '../../components/grid/Grid.remix';

const MOCK_GANGS = Array(9).fill(null).map((_, i) => <GangGridContainerMock key={`gang_grid_mock_${i}`} />)

export function GangListScreen() {
  const gangFetchMany = useGangFetchMany();

  useEffect(() => {
    gangFetchMany.fetch({});
  }, []);

  return (
    <>
      <h1>Gangs</h1>
      <GridMedium>
        {
          gangFetchMany.loading && MOCK_GANGS}
        {
          gangFetchMany.data?.map(_ => (
            <GangGridContainer gang={_} key={`gang_grid_container_${_.id}`} />
          ))
        }
      </GridMedium>
    </>
  )
}