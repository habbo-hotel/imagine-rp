import { Card } from '../card/Card';
'use client'
import React from 'react';
import { GridLarge } from '../grid/Grid.remix';
import { SmallUserProfileContainerMock } from '../small-user-profile-container/SmallUserProfileContainerMock';

export function UserFriendsGridMock() {
  return (
    <>
      <h2>Friends</h2>
      <GridLarge>
        <SmallUserProfileContainerMock showMothref={false} showRank={false} />
      </GridLarge>
      <GridLarge>&nbsp;</GridLarge>
    </>
  )
}