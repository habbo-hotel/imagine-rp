import { Card } from '../card/Card';
import React from 'react';
import { GridLarge } from '../grid/Grid.remix';
import { RoomGridContainerMock } from '../room-grid-container/RoomGridContainerMock';

export function UserRoomsGridMock() {
  return (
    <Card header="Properties" headerImage='/img/room-icon.png'>
      <GridLarge>
        <RoomGridContainerMock />
      </GridLarge>
      <GridLarge>&nbsp;</GridLarge>
    </Card>
  )
}