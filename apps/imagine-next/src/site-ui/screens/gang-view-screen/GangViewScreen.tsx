'use client'
import React, { useEffect } from 'react';
import { GridLarge } from '../../components/grid/Grid.remix';
import DayJS from 'dayjs';
import { Card } from '../../components/card/Card';
import { useGangFetchOne } from '@imagine-cms/client';
import { GangGridContainerAvatar } from '../../components/gang-grid-container/GangGridContainer.styled';
import { Avatar } from '../../components/avatar/Avatar';
import { SmallUserProfileContainer } from '../../components/small-user-profile-container/SmallUserProfileContainer';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export function GangViewScreen() {
  const params = useParams<{ gangID: string }>();
  const gangID = Number(params!.gangID);
  const fetchGang = useGangFetchOne();

  async function refresh() {
    await fetchGang.fetch({ id: gangID });
  }

  useEffect(() => {
    refresh();
  }, [gangID]);

  return (
    <>
      <div style={{ display: 'flex', flex: 1, gap: '1.4rem', marginBottom: '2rem' }}>
        <Link href="/gangs">
          <i className="fa fa-caret-left fa-4x" />
        </Link>
        <div style={{ display: 'flex', flex: 1, gap: '1.4rem', alignItems: 'center' }}>
          <GangGridContainerAvatar>
            {fetchGang.data &&

              <Link href={`/profile/${fetchGang.data.group.user.username}`}>
                <Avatar look={fetchGang.data.group.user.look} style={{ cursor: 'pointer' }} />
              </Link>}
          </GangGridContainerAvatar>
          <div>
            <h4 style={{ margin: 0 }}>Gangs - Viewing:</h4>
            <h1 style={{ margin: 0, fontWeight: 'bold' }}>{fetchGang.data?.group.name ?? `#${gangID}`}</h1>
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
                    ? <SmallUserProfileContainer user={fetchGang.data.group.user as any} showMotto={false} showRank={false} />
                    : <i className="fa fa-spinner fa-spin" />
                }
              </div>
            </div>
          </Card>
        </div>
      </GridLarge>
    </>
  )
}