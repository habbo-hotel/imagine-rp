import { Card } from '../card/Card';
import React from 'react';
import { GridLarge } from '../grid/Grid.remix';
import { RoomGridContainerMock } from '../room-grid-container/RoomGridContainerMock';

export function UserRoomsGridMock() {
  return (
    <>
      <h2>Properties</h2>
      <GridLarge>
        <RoomGridContainerMock />
      </GridLarge>
      <GridLarge>&nbsp;</GridLarge>
    </>
  )
}