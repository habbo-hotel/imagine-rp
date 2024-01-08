'use client'
import React, { useContext, useEffect } from 'react';
import { themeContext } from '@imagine-cms/web';

export function PlayGameScreen() {
  const { setTheme, showClient } = useContext(themeContext);

  useEffect(() => {
    if (showClient) {
      return;
    }
    setTheme({ showClient: true });
  }, [showClient]);

  return null;
}
