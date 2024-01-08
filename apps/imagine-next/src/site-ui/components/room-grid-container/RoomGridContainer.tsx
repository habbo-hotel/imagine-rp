'use client'
import React from 'react';
import Link from 'next/Link';
import { RoomGridContainerProps } from './RoomGridContainer.types';
import { RoomGridContainerElement } from './RoomGridContainer.styled';

export function RoomGridContainer({ room }: RoomGridContainerProps) {
  return (
    <Link href={`/rooms/${room.id}`}>
      <RoomGridContainerElement>
        <img src="/img/room-icon.svg" />
        <h3>{room.name}</h3>
      </RoomGridContainerElement>
    </Link>
  )
}