import { useCorporationFetchOne } from '@imagine-cms/client';
import React, { useContext, useEffect } from 'react';
import { Link, useRoute } from 'wouter';
import { GridLarge } from '../../components/grid/Grid.remix';
import { configContext } from '@imagine-cms/web';
import { CorpGridContainerBadge } from '../../components/corp-grid-container/CorpGridContainer.styled';
import DayJS from 'dayjs';
import { Card } from '../../components/card/Card';

export function CorpViewScreen() {
  const { config } = useContext(configContext);
  const [, params] = useRoute<{ corpID: string }>('/corps/:corpID');
  const corpID = Number(params!.corpID);
  const fetchCorp = useCorporationFetchOne();

  useEffect(() => {
    fetchCorp.fetch({ id: corpID });
  }, [corpID]);

  return (
    <>
      <div style={{ display: 'flex', flex: 1, gap: '1.4rem', marginBottom: '2rem' }}>
        <Link to="/corps">
          <i className="fa fa-caret-left fa-4x" style={{ cursor: 'pointer' }} />
        </Link>
        <div style={{ display: 'flex', flex: 1, gap: '1.4rem', alignItems: 'center' }}>
          <CorpGridContainerBadge src={`${config!.badgeURL}/${fetchCorp.data?.badgeCode}.${config!.badgeEXT}`} />
          <div>
            <h4 style={{ margin: 0 }}>Corporations - Viewing:</h4>
            <h1 style={{ margin: 0, fontWeight: 'bold' }}>{fetchCorp.data?.name ?? `#${corpID}`}</h1>
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
              <p>Me</p>
            </div>
            <div>
              <h4>Based in:</h4>
              <p>Detroit</p>
            </div>
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <h2>Members</h2>
        </div>
      </GridLarge>
    </>
  )
}