import React from 'react';
import { SiteFooterElement } from './SiteFooter.styled';
import Link from 'next/Link';

export function SiteFooter() {
  return (
    <SiteFooterElement className="notranslate">
      <Link href="/imagine">
        <h2 style={{ letterSpacing: 1.6, margin: 0 }}>imagine</h2>
      </Link>
      <a href="https://github.com/habbo-hotel" target="_blank" style={{ cursor: 'pointer' }} className="lechris" rel="noreferrer">
        <h4 style={{ margin: 0 }}>LeChris</h4>
      </a>
    </SiteFooterElement >
  )
}
