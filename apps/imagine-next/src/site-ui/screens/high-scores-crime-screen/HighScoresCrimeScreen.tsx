'use client'
import React from 'react';
import { Accordion } from '../../components/accordion/Accordion';
import { HighScoresContainer } from '../../components/high-scores-container/HighScoresContainer';
import { RPStatsOrderBy } from '@imagine-cms/client';
import { HighScoresByRPStatsGrid } from '../../components/high-scores-by-rp-stats-grid/HighScoresByRPStatsGrid';

export function HighScoresCrimeScreen() {
  return (
    <HighScoresContainer>
      <Accordion defaultIsOpen header="Arrests">
        <HighScoresByRPStatsGrid orderBy={RPStatsOrderBy.arrestsTotal}>
          arrests
        </HighScoresByRPStatsGrid>
      </Accordion>
      <br />
      <Accordion header="Times arrested">
        <HighScoresByRPStatsGrid orderBy={RPStatsOrderBy.timesArrestedTotal}>
          times arrested
        </HighScoresByRPStatsGrid>
      </Accordion>
      <br />
      <Accordion header="Successful evasions">
        <HighScoresByRPStatsGrid orderBy={RPStatsOrderBy.successfulEvasionsTotal}>
          evasions
        </HighScoresByRPStatsGrid>
      </Accordion>


    </HighScoresContainer>
  )
}
