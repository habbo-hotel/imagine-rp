import React from 'react';
import { CorpGridContainerProps } from './CorpGridContainer.types';
import { CorpGridContainerElement } from './CorpGridContainer.styled';

export function CorpGridContainer({ corporation }: CorpGridContainerProps) {
  return (
    <CorpGridContainerElement>
      hi {corporation.name}
    </CorpGridContainerElement>
  );
}