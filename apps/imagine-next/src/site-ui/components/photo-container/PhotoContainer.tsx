'use client'
import React from 'react';
import Link from 'next/Link';
import { PhotoContainerProps } from './PhotoContainer.types';

export function PhotoContainer({ story, ...props }: PhotoContainerProps) {
  return (
    <Link href={`/photos/${story.id}`}>
      <img src={story.photoURL} loading="lazy" {...props} />
    </Link>

  )
} 