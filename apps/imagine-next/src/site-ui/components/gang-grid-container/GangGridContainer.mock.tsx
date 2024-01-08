'use client'
import React from 'react';
import { GangGridContainerAvatar, GangGridContainerElement, GangGridContainerInfo } from './GangGridContainer.styled';
import { Avatar } from '../avatar/Avatar';

export function GangGridContainerMock() {
  return (
    <GangGridContainerElement>
      <GangGridContainerAvatar>
        <Avatar look="-" />
      </GangGridContainerAvatar>
      <GangGridContainerInfo>
        <h2>-</h2>
        <p><i className="fa fa-spinner fa-spin" /></p>
      </GangGridContainerInfo>
    </GangGridContainerElement>
  )
}