import React from 'react';
import { GangGridContainerAvatar, GangGridContainerElement, GangGridContainerInfo } from './GangGridContainer.styled';
import { GangGridContainerProps } from './GangGridContainer.types';
import { Avatar } from '../avatar/Avatar';
import { Link } from 'wouter';

export function GangGridContainer({ gang }: GangGridContainerProps) {
  return (
    <Link to={`/gangs/${gang.id}`}>
      <GangGridContainerElement>
        <GangGridContainerAvatar>
          <Avatar look={gang.user.look} />
        </GangGridContainerAvatar>
        <GangGridContainerInfo>
          <h2>{gang.name}</h2>
          <p>{gang.description}</p>
        </GangGridContainerInfo>
      </GangGridContainerElement>
    </Link>
  )
}