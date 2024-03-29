'use client'
import React from 'react';
import { Accordion } from '../../components/accordion/Accordion';
import { HighScoresContainer } from '../../components/high-scores-container/HighScoresContainer';

export function HighScoresActivityScreen() {
  return (
    <HighScoresContainer>
      <Accordion defaultIsOpen header="Online Time">
        coming soon
      </Accordion>
    </HighScoresContainer>
  )
}
