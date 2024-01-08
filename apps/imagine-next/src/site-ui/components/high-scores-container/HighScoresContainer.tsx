'use client'
import React from 'react';
import { HighScoresContainerProps } from './HighScoresContainer.types';
import { HighScoresContainerNavigation } from './HighScoresContainer.styled';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function HighScoresContainer({ children }: HighScoresContainerProps) {
  const pathname = usePathname();
  return (
    <>
      <HighScoresContainerNavigation>
        <Link href="/high-scores/roleplay">
          <span className={pathname === '/high-scores/roleplay' ? 'active' : ''}>
            Roleplay
          </span>
        </Link>
        <Link href="/high-scores/economy">
          <span className={pathname === '/high-scores/economy' ? 'active' : ''}>
            Economy
          </span>
        </Link>
        <Link href="/high-scores/crime">
          <span className={pathname === '/high-scores/crime' ? 'active' : ''}>
            Crime
          </span>
        </Link>
        <Link href="/high-scores/activity">
          <span className={pathname === '/high-scores/activity' ? 'active' : ''}>
            Activity
          </span>
        </Link>
      </HighScoresContainerNavigation>
      <br />
      {children}
    </>
  )
}