'use client';
import React from 'react';
import { Global, css, useTheme } from '@emotion/react'

export function SiteBody() {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        body, html, #root {
          background: ${theme.color.s10};
          color: ${theme.color.s60};
          font-family: '${theme.fontFamily.primary};
          min-width: 100%;
          min-height: 100%;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
      }

      .lechris {
        color: white !important;
        cursor: pointer;
        text-decoration: none;
        &:hover {
          text-decoration: none;
        }
      }

      .goog-te-combo {
        background: ${theme.color.s30};
        border-radius: ${theme.radius.oneUnit};
        padding: ${theme.space.halfUnit};
      }

      .goog-te-gadget {
        color: transparent;
        display: flex;
        flex-direction: column;
      }

      .goog-te-gadget img {
        display: none;

      }

      .goog-te-gadget a {
        display: none;
      }

      body {
        top: 0px !important;
      }

      .skiptranslate iframe {
        visibility: hidden !important;
      }


      a {
        color: ${theme.color.s60};
        text-decoration: none;
        cursor: pointer;
      }
      `}
    />
  )
}