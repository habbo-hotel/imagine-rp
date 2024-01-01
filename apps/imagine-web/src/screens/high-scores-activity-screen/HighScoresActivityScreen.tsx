import React from 'react';
import { Accordion } from '../../components/accordion/Accordion';
import { HighScoresContainer } from '../../components/high-scores-container/HighScoresContainer';

export function HighScoresActivityScreen() {
  return (
    <HighScoresContainer>
      <h1>High Scores - Activity</h1>

      <br />
      <Accordion header="Online Time">
        coming soon
      </Accordion>
    </HighScoresContainer>
  )
}
