import DayJS from 'dayjs';
import { Link } from 'wouter';
import { Badge } from '../badge/Badge';
import { Avatar } from '../avatar/Avatar';
import { configContext } from '@imagine-cms/web';
import React, { useContext, useEffect, useMemo } from 'react';
import { UserProfileContainerProps } from './UserProfileContainer.types';
import { UserBadgeContainerGrid } from '../user-badge-container-grid/UserBadgeContainerGrid';
import { InformationContainer, UserProfileContainerContent, UserProfileContainerElement, UserProfileStat } from './UserProfileContainer.styled';
import { useCorporationFetchOne, useGangFetchOne } from '@imagine-cms/client';

export function UserProfileContainer({ user }: UserProfileContainerProps) {
  const corporationFetchOne = useCorporationFetchOne();
  const gangFetchOne = useGangFetchOne();
  const { config } = useContext(configContext);

  const lastVisit = useMemo(() => {
    return DayJS.unix(user.lastOnlineAt).format(config!.dateFormat);
  }, [user.lastOnlineAt, config!.dateFormat]);

  async function refresh() {
    if (user.rpStats.corporationID) {
      await corporationFetchOne.fetch({ id: user.rpStats.corporationID })
    }
    if (user.rpStats.gangID) {
      await gangFetchOne.fetch({ id: user.rpStats.gangID })
    }
  }
  useEffect(() => {
    refresh();
  }, [user.id]);

  return (
    <UserProfileContainerElement>
      <UserProfileContainerContent>
        <Avatar look={user.look} direction={2} headDirection={3} gesture="sml" action="wav" size="l" />
        <InformationContainer>
          <div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to={`/ranks/${user.rank.id}`}>
                <Badge badge={{ code: user.rank.badgeCode }} style={{ height: 45, marginTop: 10 }} />
              </Link>
              <h2 className="notranslate" style={{ color: user.rank.backgroundColor }}>
                {user.username}
              </h2>
            </div>
          </div>
          <br />
          <UserBadgeContainerGrid user={user as any} />
        </InformationContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <UserProfileStat>
            <div>Job</div>
            <b>{user.rpStats.corporationID ? corporationFetchOne.data?.name : 'No job'}</b>
          </UserProfileStat>
          <UserProfileStat>
            <div>Gang</div>
            <b>{user.rpStats.gangID ? gangFetchOne.data?.name : 'No gang'}</b>
          </UserProfileStat>
          <UserProfileStat>
            <div>Last Visit</div>
            <b>{lastVisit}</b>
          </UserProfileStat>
        </div>
      </UserProfileContainerContent>
    </UserProfileContainerElement >
  )
}