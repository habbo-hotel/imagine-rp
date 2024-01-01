import React from 'react';
import { Accordion } from '../../components/accordion/Accordion';
import { HighScoresContainer } from '../../components/high-scores-container/HighScoresContainer';

export function HighScoresEconomyScreen() {
  return (
    <HighScoresContainer>
      <h1>High Scores - Economy</h1>
      <Accordion header="Cash on hand">
        coming soon
      </Accordion>
      <br />
      <Accordion header="Bank account">
        coming soon
      </Accordion>
    </HighScoresContainer>
  )
}
