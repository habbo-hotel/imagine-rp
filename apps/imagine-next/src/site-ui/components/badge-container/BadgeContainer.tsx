'use client'
import React from 'react';
import { Badge } from '../badge/Badge';
import { BadgeHolder } from './BadgeContainer.styled';
import { BadgeContainerProps } from './BadgeContainer.types';
import Link from 'next/Link';

export function BadgeContainer({ badge }: BadgeContainerProps) {
  return (
    <Link href={`/badges/${badge.code}`}>
      <BadgeHolder>
        <Badge badge={badge} />
      </BadgeHolder>
    </Link>
  )
}