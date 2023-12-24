import { useGangFetchMany } from '@imagine-cms/client';
import React, { useEffect } from 'react';
import { Grid } from '../../components/grid/Grid';
import { GangGridContainerMock } from '../../components/gang-grid-container/GangGridContainer.mock';
import { GangGridContainer } from '../../components/gang-grid-container/GangGridContainer';

export function GangListScreen() {
  const gangFetchMany = useGangFetchMany();

  useEffect(() => {
    gangFetchMany.fetch({});
  }, []);

  return (
    <>
      <h1>Gangs</h1>
      <Grid>
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
      </Grid>
    </>
  )
}