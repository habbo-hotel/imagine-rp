import React from 'react';
import { Badge } from '../badge/Badge';
import { Avatar } from '../avatar/Avatar';
import { InformationContainer, UserProfileContainerContent, UserProfileContainerElement, UserProfileStat } from './UserProfileContainer.styled';
import { UserBadgeContainerGridElement } from '../user-badge-container-grid/UserBadgeContainerGrid.styled';

export function UserProfileContainerMock() {
  return (
    <UserProfileContainerElement>
      <UserProfileContainerContent>
        <Avatar look="-" gesture="sml" action="wav" size="l" />
        <InformationContainer>
          <div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge badge={{ code: 'FAN' }} style={{ height: 45, marginTop: 10 }} />
              <h2 className="notranslate">
                -
              </h2>
            </div>
          </div>
          <br />
          <UserBadgeContainerGridElement />
        </InformationContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <UserProfileStat>
            <div>Job</div>
            No job
          </UserProfileStat>
          <UserProfileStat>
            <div>Gang</div>
            No gang
          </UserProfileStat>
          <UserProfileStat>
            <div>Last Visit</div>
            <b>-</b>
          </UserProfileStat>
        </div>
      </UserProfileContainerContent>
    </UserProfileContainerElement >
  )
}