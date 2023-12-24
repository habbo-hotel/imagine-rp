import React, { useContext } from 'react';
import { CorpGridContainerProps } from './CorpGridContainer.types';
import { CorpGridContainerElement } from './CorpGridContainer.styled';
import { configContext } from '@imagine-cms/web';

export function CorpGridContainer({ corporation }: CorpGridContainerProps) {
  const { config } = useContext(configContext);
  return (
    <CorpGridContainerElement>
      <img src={`${config!.badgeURL}/${corporation.badgeCode}.${config!.badgeEXT}`} />
      <div>
        <h2>{corporation.name}</h2>
        <p>{corporation.description}</p>
      </div>
    </CorpGridContainerElement>
  );
}