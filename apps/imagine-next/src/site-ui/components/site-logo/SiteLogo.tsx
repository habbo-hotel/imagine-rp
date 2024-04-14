'use client'
import React, { useContext } from 'react';
import { sessionContext, themeContext } from '@imagine-cms/web';
import Link from 'next/link';

export function SiteLogo() {
  const { theme } = useContext(themeContext);
  const { session } = useContext(sessionContext);
  return (
    <Link href={session ? '/me' : '/login'}>
      <img src={theme === 'dark' ? 'https://i.imgur.com/vuO1asy.png' : 'https://i.imgur.com/wnhkVSm.png'} loading="lazy" style={{ maxHeight: 100, objectFit: 'cover' }} />
    </Link>
  )
}