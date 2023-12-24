import React from 'react';
import { GangGridContainerElement } from './GangGridContainer.styled';
import { GangGridContainerProps } from './GangGridContainer.types';

export function GangGridContainer({ gang }: GangGridContainerProps) {
  return (
    <GangGridContainerElement>
      gang gang {gang.name}
    </GangGridContainerElement>
  )
}