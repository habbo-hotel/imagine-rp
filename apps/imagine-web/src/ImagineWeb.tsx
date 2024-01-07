import React from 'react';
import { ThemeProvider } from './site-ui/theme/ThemeProvider';
import { ImagineContextProviders, LoadingScreen } from '@imagine-cms/web';
import { Route, Switch } from 'wouter';
import { IMAGINE_ROUTES } from './site-ui/ImagineWeb.const';
export function ImagineWeb() {

  return (
    <ImagineContextProviders loadingScreen={<LoadingScreen />}>
      <ThemeProvider>
        <Switch>
          <>
            {
              IMAGINE_ROUTES.map(route => {
                const Component = route.guard ? <route.guard redirect><route.view /></route.guard> : <route.view />
                const Container = route.layout ? <route.layout>{Component}</route.layout> : <>{Component}</>

                return <Route key={`route_${route.path}`} path={route.path} children={Container} />
              })
            }
          </>
        </Switch>
      </ThemeProvider >
    </ImagineContextProviders>
  )
}
