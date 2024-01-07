import React from 'react';
import { Button } from 'react-bootstrap';
import { TryVisitRoom } from '../../../api';

export function TaxiToHubButton() {

  async function onCallTaxi() {
    TryVisitRoom(1)
  }
  return (
    <div>
      <Button onClick={onCallTaxi}>
        Call a taxi
      </Button>
    </div>
  )
}