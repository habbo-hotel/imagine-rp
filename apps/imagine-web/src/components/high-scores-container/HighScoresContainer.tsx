import React from 'react';
import { HighScoresContainerProps } from './HighScoresContainer.types';
import { HighScoresContainerNavigation } from './HighScoresContainer.styled';
import { Link } from 'wouter';

export function HighScoresContainer({ children }: HighScoresContainerProps) {
  return (
    <>
      <HighScoresContainerNavigation>
        <ul>
          <Link to="/high-scores/roleplay">
            <li>Roleplay</li>
          </Link>
          <Link to="/high-scores/economy">
            <li>Economy</li>
          </Link>
          <Link to="/high-scores/crime">
            <li>Criminal</li>
          </Link>
          <Link to="/high-scores/activity">
            <li>Activity</li>
          </Link>
        </ul>
      </HighScoresContainerNavigation>
      <br />
      {children}
    </>
  )
}