import React, { useContext } from 'react';
import { Card } from '../../blocks/card/Card';
import { sessionContext } from '@imagine-cms/web';

export function DashboardScreen() {
  const { session } = useContext(sessionContext);
  return (
    <>
      <h1>Dashboard</h1>
      <Card>
        <p>Welcome back, <b>{session!.username}</b></p>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card header="About">
          <p>our admin panel is still being developed and is probably missing most features, especially useful ones.</p>
        </Card>
      </div>
    </>
  )
}
