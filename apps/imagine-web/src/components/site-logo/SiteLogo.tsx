import React, { useContext } from 'react';
import { configContext } from '@imagine-cms/web';

export function SiteLogo() {
  const { config } = useContext(configContext);
  return (
    <img src={config!.logoURL} loading="lazy" style={{ maxHeight: 100, objectFit: 'cover' }} />
  )
}