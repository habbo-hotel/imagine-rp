'use client'
import React, { useContext } from 'react';
import { CorpGridContainerBadge, CorpGridContainerElement, CorpGridContainerInfo } from './CorpGridContainer.styled';
import { configContext } from '@imagine-cms/web';

export function CorpGridContainerMock() {
  const { config } = useContext(configContext);
  return (
    <CorpGridContainerElement>
      <CorpGridContainerBadge src={`${config!.badgeURL}/ADM.${config!.badgeEXT}`} />
      <CorpGridContainerInfo>
        <h2>-</h2>
        <p>
          <i className="fa fa-spinner fa-spin" />
        </p>
      </CorpGridContainerInfo>
    </CorpGridContainerElement>
  );
}