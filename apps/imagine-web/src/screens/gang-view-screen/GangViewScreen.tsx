import React, { useEffect } from 'react';
import { Link, useRoute } from 'wouter';
import { GridLarge } from '../../components/grid/Grid.remix';
import DayJS from 'dayjs';
import { Card } from '../../components/card/Card';
import { useGangFetchOne } from '@imagine-cms/client';
import { GangGridContainerAvatar } from '../../components/gang-grid-container/GangGridContainer.styled';
import { Avatar } from '../../components/avatar/Avatar';
import { SmallUserProfileContainer } from '../../components/small-user-profile-container/SmallUserProfileContainer';
import { GangMemberGridContainer } from '../../components/gang-member-grid-container/GangMemberGridContainer';

export function GangViewScreen() {
  const [, params] = useRoute<{ gangID: string }>('/gangs/:gangID');
  const gangID = Number(params!.gangID);
  const fetchGang = useGangFetchOne();

  useEffect(() => {
    fetchGang.fetch({ id: gangID });
  }, [gangID]);

  return (
    <>
      <div style={{ display: 'flex', flex: 1, gap: '1.4rem', marginBottom: '2rem' }}>
        <Link to="/gangs">
          <i className="fa fa-caret-left fa-4x" />
        </Link>
        <div style={{ display: 'flex', flex: 1, gap: '1.4rem', alignItems: 'center' }}>
          <GangGridContainerAvatar>
            {fetchGang.data &&

              <Link to={`/profile/${fetchGang.data.user.username}`}>
                <Avatar look={fetchGang.data.user.look} style={{ cursor: 'pointer' }} />
              </Link>}
          </GangGridContainerAvatar>
          <div>
            <h4 style={{ margin: 0 }}>Gangs - Viewing:</h4>
            <h1 style={{ margin: 0, fontWeight: 'bold' }}>{fetchGang.data?.name ?? `#${gangID}`}</h1>
          </div>
        </div>
      </div>
      <GridLarge>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 16 }}>
          <h2>About</h2>
          <Card>
            <div>
              <h4>Founded:</h4>
              <h3>{DayJS().format('MMMM DD, YYYY')}</h3>
            </div>

            <div>
              <h4>Owned By:</h4>
              <div style={{ maxWidth: 200 }}>
                {
                  fetchGang.data
                    ? <SmallUserProfileContainer user={fetchGang.data.user as any} showMotto={false} showRank={false} />
                    : <i className="fa fa-spinner fa-spin" />
                }
              </div>
            </div>
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Members</h2>
          <GangMemberGridContainer gangID={gangID} />
        </div>
      </GridLarge>
    </>
  )
}