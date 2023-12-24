import React, { useContext } from 'react';
import { CorpGridContainerProps } from './CorpGridContainer.types';
import { CorpGridContainerBadge, CorpGridContainerElement, CorpGridContainerInfo } from './CorpGridContainer.styled';
import { configContext } from '@imagine-cms/web';

export function CorpGridContainer({ corporation }: CorpGridContainerProps) {
  const { config } = useContext(configContext);
  return (
    <CorpGridContainerElement>
      <CorpGridContainerBadge src={`${config!.badgeURL}/${corporation.badgeCode}.${config!.badgeEXT}`} />
      <CorpGridContainerInfo>
        <h2>{corporation.name}</h2>
        <p>{corporation.description}</p>
      </CorpGridContainerInfo>
    </CorpGridContainerElement>
  );
}