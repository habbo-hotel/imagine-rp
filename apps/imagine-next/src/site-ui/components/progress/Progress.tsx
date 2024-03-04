'use client'
import React from 'react';
import { ProgressProps } from './Progress.types';
import { ProgressContainer, ProgressElement } from './Progress.styled';

export function Progress({ ...props }: ProgressProps) {
  return (
    <ProgressContainer>
      {props.percent > 0 && <ProgressElement style={{ width: `${props.percent}%` }} {...props as any} />}
      {props.children}
    </ProgressContainer>
  )
}