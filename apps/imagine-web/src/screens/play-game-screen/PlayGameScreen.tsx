import React, { useContext, useEffect } from 'react';
import { themeContext } from '@imagine-cms/web';

export function PlayGameScreen() {
  const { setTheme } = useContext(themeContext);

  useEffect(() => {
    setTheme({ showClient: true });
  }, []);

  return <>play game</>
}
