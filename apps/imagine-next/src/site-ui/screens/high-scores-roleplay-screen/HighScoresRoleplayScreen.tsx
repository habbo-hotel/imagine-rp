'use client'
import React from 'react';
import { Accordion } from '../../components/accordion/Accordion';
import { HighScoresContainer } from '../../components/high-scores-container/HighScoresContainer';
import { HighScoresByRPStatsGrid } from '../../components/high-scores-by-rp-stats-grid/HighScoresByRPStatsGrid';
import { RPStatsOrderBy } from '@imagine-cms/client';

export function HighScoresRoleplayScreen() {
  return (
    <HighScoresContainer>
      <Accordion defaultIsOpen header="Kill death ratio">
        <HighScoresByRPStatsGrid orderBy={RPStatsOrderBy.killDeathRatio}>
          kdr
        </HighScoresByRPStatsGrid>
      </Accordion>
      <br />
      <Accordion header="Kills">
        <HighScoresByRPStatsGrid orderBy={RPStatsOrderBy.killsTotal}>
          kills
        </HighScoresByRPStatsGrid>
      </Accordion>
      <br />
      <Accordion header="Deaths">
        <HighScoresByRPStatsGrid orderBy={RPStatsOrderBy.deathsTotal}>
          deaths
        </HighScoresByRPStatsGrid>
      </Accordion>
    </HighScoresContainer>
  )
}
