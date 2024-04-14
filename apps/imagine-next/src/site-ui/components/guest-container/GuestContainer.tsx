'use client'
import React from 'react';
import { GuestGuard } from '@imagine-cms/web';
import { GuestContainerProps } from './GuestContainer.types';

export function GuestContainer({ children }: GuestContainerProps) {
  return (
    <GuestGuard >
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%' }}>
        {children}
      </div>
    </GuestGuard>
  )
}