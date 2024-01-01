import { Card } from '../card/Card';
import React from 'react';
import { GridLarge } from '../grid/Grid.remix';
import { SmallUserProfileContainerMock } from '../small-user-profile-container/SmallUserProfileContainerMock';

export function UserFriendsGridMock() {
  return (
    <>
      <h2>Friends</h2>
      <GridLarge>
        <SmallUserProfileContainerMock showMotto={false} showRank={false} />
      </GridLarge>
      <GridLarge>&nbsp;</GridLarge>
    </>
  )
}