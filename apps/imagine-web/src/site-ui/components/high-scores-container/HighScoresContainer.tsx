import React from 'react';
import { HighScoresContainerProps } from './HighScoresContainer.types';
import { HighScoresContainerNavigation } from './HighScoresContainer.styled';
import { Link, useLocation } from 'wouter';

export function HighScoresContainer({ children }: HighScoresContainerProps) {
  const [path] = useLocation();
  return (
    <>
      <HighScoresContainerNavigation>
        <Link href="/high-scores/roleplay">
          <span className={path === '/high-scores/roleplay' ? 'active' : ''}>
            Roleplay
          </span>
        </Link>
        <Link href="/high-scores/economy">
          <span className={path === '/high-scores/economy' ? 'active' : ''}>
            Economy
          </span>
        </Link>
        <Link href="/high-scores/crime">
          <span className={path === '/high-scores/crime' ? 'active' : ''}>
            Crime
          </span>
        </Link>
        <Link href="/high-scores/activity">
          <span className={path === '/high-scores/activity' ? 'active' : ''}>
            Activity
          </span>
        </Link>
      </HighScoresContainerNavigation>
      <br />
      {children}
    </>
  )
}