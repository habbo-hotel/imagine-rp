import { Card } from '../card/Card';
import React from 'react';
import { GridLarge } from '../grid/Grid.remix';
import { SmallUserProfileContainerMock } from '../small-user-profile-container/SmallUserProfileContainerMock';

export function UserFriendsGridMock() {
  return (
    <Card header="Friends" headerImage='/img/room-icon.png'>
      <GridLarge>
        <SmallUserProfileContainerMock showMotto={false} showRank={false} />
      </GridLarge>
      <GridLarge>&nbsp;</GridLarge>
    </Card>
  )
}