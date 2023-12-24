import { useCorporationFetchMany } from '@imagine-cms/client';
import React, { useEffect } from 'react';
import { CorpGridContainerMock } from '../../components/corp-grid-container/CorpGridContainer.mock';
import { CorpGridContainer } from '../../components/corp-grid-container/CorpGridContainer';
import { GridMedium } from '../../components/grid/Grid.remix';

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
          corpFetchMany.loading && (
            <>
              <CorpGridContainerMock />
              <CorpGridContainerMock />
              <CorpGridContainerMock />
              <CorpGridContainerMock />
            </>
          )
        }
        {
          corpFetchMany.data?.map(_ => (
            <CorpGridContainer corporation={_} key={`corp_grid_container_${_.id}`} />
          ))
        }
      </GridMedium>
    </>
  )
}