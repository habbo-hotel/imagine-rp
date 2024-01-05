import React, { useContext } from 'react';
import { configContext } from '@imagine-cms/web';
import { SiteFooterElement } from './SiteFooter.styled';
import { Link } from 'wouter';

export function SiteFooter() {
  const { config } = useContext(configContext);

  return (
    <SiteFooterElement className="notranslate">
      <Link to="/about">
        <h2 style={{ letterSpacing: 1.6, margin: 0 }}>imagine</h2>
      </Link>
      <a href="https://github.com/habbo-hotel" target="_blank" style={{ cursor: 'pointer' }} className="lechris" rel="noreferrer">
        <h4 style={{ margin: 0 }}>LeChris</h4>
      </a>
    </SiteFooterElement >
  )
}
