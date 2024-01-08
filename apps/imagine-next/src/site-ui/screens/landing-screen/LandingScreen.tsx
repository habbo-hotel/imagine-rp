'use client'
import React, { useContext } from 'react';
import { sessionContext } from '@imagine-cms/web';
import { redirect } from 'next/navigation';

export function LandingScreen() {
  const { session } = useContext(sessionContext);

  return redirect(session ? '/me' : '/login');
}
