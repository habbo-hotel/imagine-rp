import React from 'react';
import { GangGridContainerAvatar, GangGridContainerElement, GangGridContainerInfo } from './GangGridContainer.styled';
import { GangGridContainerProps } from './GangGridContainer.types';
import { Avatar } from '../avatar/Avatar';

export function GangGridContainer({ gang }: GangGridContainerProps) {
  console.log(gang)
  return (
    <GangGridContainerElement>
      <GangGridContainerAvatar>
        <Avatar look={gang.user.look} />
      </GangGridContainerAvatar>
      <GangGridContainerInfo>
        <h2>{gang.name}</h2>
        <p>{gang.description}</p>
      </GangGridContainerInfo>
    </GangGridContainerElement>
  )
}