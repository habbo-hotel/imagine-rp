import React from 'react';
import { ProgressProps } from './Progress.types';
import { ProgressElement } from './Progress.styled';

export function Progress({ ...props }: ProgressProps) {
  return (
    <>
      <ProgressElement {...props} />
    </>
  )
}