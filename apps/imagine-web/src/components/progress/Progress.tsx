import React from 'react';
import { ProgressProps } from './Progress.types';
import { ProgressContainer, ProgressElement } from './Progress.styled';

export function Progress({ ...props }: ProgressProps) {
  return (
    <ProgressContainer>
      <ProgressElement style={{ width: `${props.percent}%` }} {...props} />
    </ProgressContainer>
  )
}