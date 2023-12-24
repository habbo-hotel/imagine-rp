import React from 'react';
import { GridLarge } from '../../components/grid/Grid.remix';
import { MostCreditsGrid } from './most-credits-grid/MostCreditsGrid';
import { MostVIPPointsGrid } from './most-vip-points-grid/MostVIPPointsGrid';
import { MostActivityPointsGrid } from './most-activity-points-grid/MostActivityPointsGrid';
import { Accordion } from '../../components/accordion/Accordion';

export function HighScoresScreen() {
  return (
    <>
      <h1>Top Players</h1>
      <Accordion defaultIsOpen header="Lifestyle">
        <GridLarge>
          <MostCreditsGrid />
          <MostActivityPointsGrid />
          <MostVIPPointsGrid />
        </GridLarge>
      </Accordion>
      <br />
      <Accordion header="Crime">
        <GridLarge>
          <MostCreditsGrid />
          <MostActivityPointsGrid />
          <MostVIPPointsGrid />
        </GridLarge>
      </Accordion>
      <br />
      <Accordion header="Corporation">
        <GridLarge>
          <MostCreditsGrid />
          <MostActivityPointsGrid />
          <MostVIPPointsGrid />
        </GridLarge>
      </Accordion>
      <br />
      <Accordion header="Activity">
        <GridLarge>
          <MostCreditsGrid />
          <MostActivityPointsGrid />
          <MostVIPPointsGrid />
        </GridLarge>
      </Accordion>
    </>
  )
}
