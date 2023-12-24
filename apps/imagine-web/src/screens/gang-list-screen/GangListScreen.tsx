import { useGangFetchMany } from '@imagine-cms/client';
import React, { useEffect } from 'react';
import { GangGridContainerMock } from '../../components/gang-grid-container/GangGridContainer.mock';
import { GangGridContainer } from '../../components/gang-grid-container/GangGridContainer';
import { GridMedium } from '../../components/grid/Grid.remix';

export function GangListScreen() {
  const gangFetchMany = useGangFetchMany();

  useEffect(() => {
    gangFetchMany.fetch({});
  }, []);

  console.log(gangFetchMany)

  return (
    <>
      <h1>Gangs</h1>
      <GridMedium>
        {
          gangFetchMany.loading && (
            <>
              <GangGridContainerMock />
              <GangGridContainerMock />
              <GangGridContainerMock />
              <GangGridContainerMock />
            </>
          )
        }
        {
          gangFetchMany.data?.map(_ => (
            <GangGridContainer gang={_} key={`gang_grid_container_${_.id}`} />
          ))
        }
      </GridMedium>
    </>
  )
}